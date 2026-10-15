import { select } from '@inquirer/prompts';
import chalk from 'chalk';

import { getWorkspaces } from '../../asana/api/getWorkspaces';

export const chooseWorkspace = async (accessToken: string) => {
  const workspaces = await getWorkspaces(accessToken);

  if (workspaces.length === 0) {
    console.log(chalk.yellow('No workspaces found.'));
  }

  return select({
    message: 'Select a workspace to continue:',
    choices: workspaces.map((workspace) => ({
      name: `${workspace.name} (${workspace.gid})`,
      value: workspace.gid
    }))
  });
};
