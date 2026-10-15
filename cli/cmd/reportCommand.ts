import { chooseAssignee } from '../utils/chooseAssignee';
import { chooseWorkspace } from '../utils/chooseWorkspace';
import { getPersonalAccessToken } from '../utils/getPersonalAccessToken';

export async function reportCommand() {
  const accessToken = await getPersonalAccessToken();
  const workspaceId = await chooseWorkspace(accessToken);

  if (!workspaceId) return;

  const assignee = await chooseAssignee(accessToken, workspaceId);

  console.log(assignee);

  return;
}
