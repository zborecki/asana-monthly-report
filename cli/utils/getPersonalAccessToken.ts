import { password } from "@inquirer/prompts";

export const getPersonalAccessToken = async () => password({
  message: "Personal access token:",
  mask: "*",
});