import { getPersonalAccessToken } from '../utils/getPersonalAccessToken';

export async function reportCommand() {
  const token = await getPersonalAccessToken();

  console.log(token);

  return;
}
