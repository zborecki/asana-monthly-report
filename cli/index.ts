import { select } from "@inquirer/prompts";
import { reportCommand } from "./cmd/reportCommand";

async function cli() {
  while (true) {
    try {
      const command = await select({
        message: "Asana Monthly Report (CLI) — choose a command:",
        choices: [
          { name: "1. Generate a report", value: "report" },
          { name: "2. Exit", value: "exit" },
        ],
      });

      if (command === "exit") {
        break;
      }

      try {
        switch (command) {
          case "report":
            await reportCommand();
            break;
        }
      } catch (error) {
        console.error("\nCommand failed:", error instanceof Error ? error.message : error);
      }

      console.log("");
    } catch (error) {
      if (error instanceof Error && (error.name === "ExitPromptError" || error.name === "AbortPromptError")) {
        break;
      }

      throw error;
    }
  }
}

export default cli;