import Asana from 'asana';
import ora from 'ora';

import { createAsanaClient } from '../utils/createAsanaClient';

export const getWorkspaces = async (accessToken: string) => {
  const client = createAsanaClient(accessToken);
  const api = new Asana.WorkspacesApi(client);

  const workspaces = [];
  let offset: string | undefined;

  const spinner = ora('Fetching workspaces...').start();

  try {
    do {
      const response = await api.getWorkspaces({
        limit: 100,
        opt_fields: 'gid,name,resource_type',
        ...(offset ? { offset } : {})
      });

      workspaces.push(...(response.data ?? []));
      offset = response.next_page?.offset ?? undefined;
    } while (offset);
  } catch (error) {
    spinner.fail('Failed to fetch workspaces');
    throw error;
  }

  const count = workspaces.length;

  spinner.succeed(`Fetched ${count} workspace${count === 1 ? '' : 's'}.`);

  return workspaces;
};
