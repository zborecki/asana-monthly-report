import Asana from 'asana';
import ora from 'ora';

import { createAsanaClient } from '../utils/createAsanaClient';

import type { AsanaUser } from '../../types/asana';

export async function getAssignees(accessToken: string, workspaceId: string) {
  const spinner = ora('Fetching users...').start();

  try {
    const client = createAsanaClient(accessToken);
    const api = new Asana.UsersApi(client);

    const users: AsanaUser[] = [];
    let offset: string | undefined;

    do {
      const response = await api.getUsersForWorkspace(workspaceId, {
        opt_fields: 'gid,name',
        ...(offset ? { offset } : {})
      });

      users.push(...(response.data ?? []));
      offset = response.next_page?.offset;
    } while (offset);

    const count = users.length;

    spinner.succeed(`Fetched ${count} user${count === 1 ? '' : 's'}.`);

    return users;
  } catch (error: unknown) {
    spinner.fail('Failed to fetch users.');

    if (error instanceof Error) {
      throw new Error(`Could not fetch assignees: ${error.message}`, {
        cause: error
      });
    }

    throw new Error('Could not fetch assignees due to an unknown error.', {
      cause: error
    });
  }
}
