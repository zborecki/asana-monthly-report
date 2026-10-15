import Asana from 'asana';
import ora from 'ora';

import { getAsanaClient } from '../clients';

import type { ICommandLineOptions } from '../../types/cli';
import { getMonthRange } from '../../utils/get-month-range';

interface AsanaUser {
  gid: string;
  name?: string;
}

interface AsanaProject {
  gid?: string;
  name: string;
}

interface AsanaTask {
  gid: string;
  name: string;
  created_at?: string;
  completed?: boolean;
  completed_at?: string | null;
  completed_by?: AsanaUser | null;
  assignee?: AsanaUser | null;
  permalink_url?: string;
  projects?: AsanaProject[];
  resource_subtype?: string;
}

export async function getCompletedTasks(
  options: ICommandLineOptions
): Promise<AsanaTask[]> {
  const client = getAsanaClient({ token: options.token });
  const api = new Asana.TasksApi(client);

  const { start, end } = getMonthRange({
    month: options.month,
    timezone: options.timezone
  });

  const tasks = new Map<string, AsanaTask>();
  const spinner = ora('Fetching completed tasks...').start();

  try {
    let offset: string | undefined;

    do {
      const response = await api.getTasks({
        workspace: options.workspace,
        assignee: options.assignee,
        completed_since: start.toISOString(),
        limit: 100,
        ...(offset ? { offset } : {}),
        opt_fields: [
          'gid',
          'name',
          'created_at',
          'completed',
          'completed_at',
          'assignee.gid',
          'assignee.name',
          'permalink_url',
          'projects.gid',
          'projects.name',
          'resource_subtype'
        ].join(',')
      });

      const batch = (response.data ?? []) as AsanaTask[];

      for (const task of batch) {
        if (
          task.completed === true &&
          task.completed_at &&
          new Date(task.completed_at) >= start &&
          new Date(task.completed_at) < end &&
          task.resource_subtype === 'default_task'
        ) {
          tasks.set(task.gid, task);
        }
      }

      spinner.text = `Found ${tasks.size} tasks...`;

      offset = response.next_page?.offset ?? undefined;
    } while (offset);

    const result = [...tasks.values()].sort((a, b) =>
      (a.completed_at ?? '').localeCompare(b.completed_at ?? '')
    );

    spinner.succeed(`Fetched ${result.length} completed tasks`);

    return result;
  } catch (error) {
    spinner.fail('Failed to fetch tasks');
    console.error('Asana API error:', error);
    throw error;
  }
}
