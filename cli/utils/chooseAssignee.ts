import { select } from '@inquirer/prompts';

import { getAssignees } from '../../asana/api/getAssignees';

export const chooseAssignee = async (accessToken: string, workspaceId: string) => {
  const users = await getAssignees(accessToken, workspaceId);

  const assigneeId = await select({
    message: 'Select an assignee:',
    choices: users.map((user) => ({
      name: `${user.name ?? 'Unknown'} (${user.gid})`,
      value: user.gid
    }))
  });

  const assignee = users.find((user) => user.gid === assigneeId);

  return {
    id: assigneeId,
    name: assignee?.name ?? 'Unknown'
  };
};
