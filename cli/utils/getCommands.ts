import { select } from '@inquirer/prompts';

export const getCommands = async () => select({
  message: 'Asana Monthly Report (CLI) — choose a command:',
  choices: [
    {
      name: '1. Create a report',
      value: 'report'
    },
    {
      name: '2. Exit',
      value: 'exit'
    }
  ]
});
