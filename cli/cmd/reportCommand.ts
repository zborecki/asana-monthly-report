import { chooseAssignee } from '../utils/chooseAssignee';
import { chooseMonth } from '../utils/chooseMonth';
import { chooseWorkspace } from '../utils/chooseWorkspace';
import { enterTimezone } from '../utils/enterTimezone';
import { getPersonalAccessToken } from '../utils/getPersonalAccessToken';

export async function reportCommand() {
  const accessToken = await getPersonalAccessToken();
  const workspaceId = await chooseWorkspace(accessToken);

  if (!workspaceId) return;

  const assignee = await chooseAssignee(accessToken, workspaceId);
  const month = await chooseMonth();
  const timezone = await enterTimezone();

  console.log(month);

  return;
}
