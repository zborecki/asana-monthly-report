import Asana from 'asana';

export const createAsanaClient = (accessToken: string) => {
  const client = new Asana.ApiClient();

  if (!client.authentications['token']) {
    throw new Error('Token is not defined.');
  }

  client.authentications['token'].accessToken = accessToken;

  return client;
};
