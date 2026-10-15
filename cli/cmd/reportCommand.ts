import { chooseAssignee } from '../utils/chooseAssignee';
import { chooseMonth } from '../utils/chooseMonth';
import { chooseWorkspace } from '../utils/chooseWorkspace';
import { enterTimezone } from '../utils/enterTimezone';
import { getPersonalAccessToken } from '../utils/getPersonalAccessToken';

import { getCompletedTasks } from '../../asana/api/getCompletedTasks';
import exportReport from '../../utils/reports';

export async function reportCommand() {
  const accessToken = await getPersonalAccessToken();
  const workspaceId = await chooseWorkspace(accessToken);

  if (!workspaceId) return;

  const assignee = await chooseAssignee(accessToken, workspaceId);
  const month = await chooseMonth();
  const timezone = await enterTimezone();

  const tasks = await getCompletedTasks({
    accessToken, assigneeId: assignee.id, month, timezone, workspaceId
  });

  const fileName = `${assignee.name}-${month}`.toLowerCase().replace(/\s+/g, '-');

  await exportReport(tasks, fileName);
}
