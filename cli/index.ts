import { reportCommand } from './cmd/reportCommand';
import { getCommands } from './utils/getCommands';

async function cli() {
  while (true) {
    try {
      const command = await getCommands();

      if (command === 'exit') break;

      try {
        switch (command) {
          case 'report':
            await reportCommand();
            break;
        }
      } catch (error) {
        console.error('\nCommand failed:', error instanceof Error ? error.message : error);
      }

      console.log('');
    } catch (error) {
      if (error instanceof Error && (error.name === 'ExitPromptError' || error.name === 'AbortPromptError')) {
        break;
      }

      throw error;
    }
  }
}

export default cli;
