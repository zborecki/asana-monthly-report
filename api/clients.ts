import Asana from "asana";

import type { ICommandLineOptions } from "../types/cli";

export const getAsanaClient = (options: Pick<ICommandLineOptions, 'token'>) => {
  const client = new Asana.ApiClient();

  if (!client.authentications["token"]) {
    throw new Error("Token is not defined.");
  }

  client.authentications["token"].accessToken = options.token;

  return client;
}