import Asana from 'asana';
import ora from 'ora';

import { createAsanaClient } from '../utils/createAsanaClient';

import type { AsanaTask } from '../../types/asana';
import { getMonthPeriod } from '../../utils/getMonthPeriod';

interface IGetCompletedTasks {
  accessToken: string;
  assigneeId: string;
  month: string;
  timezone: string;
  workspaceId: string;
}

export async function getCompletedTasks({
  accessToken, assigneeId, month, timezone, workspaceId
}: IGetCompletedTasks): Promise<AsanaTask[]> {
  const client = createAsanaClient(accessToken);
  const api = new Asana.TasksApi(client);

  const period = getMonthPeriod(month, timezone);

  const tasks = new Map<string, AsanaTask>();
  const spinner = ora('Fetching completed tasks...').start();

  try {
    let offset: string | undefined;

    do {
      const response = await api.getTasks({
        workspace: workspaceId,
        assignee: assigneeId,
        completed_since: period.start.toISOString(),
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
          'resource_subtype',
          'parent.projects.gid',
          'parent.projects.name',
          'parent.name'
        ].join(',')
      });

      const batch = (response.data ?? []) as AsanaTask[];

      for (const task of batch) {
        if (
          task.completed === true && task.completed_at &&
          new Date(task.completed_at) >= period.start &&
          new Date(task.completed_at) < period.end &&
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
