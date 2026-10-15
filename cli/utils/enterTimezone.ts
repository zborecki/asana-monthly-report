import { input } from '@inquirer/prompts';

export const enterTimezone = async () => input({
  message: 'Timezone:',
  default: 'Europe/Warsaw',
  required: true
});
