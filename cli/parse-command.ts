import { Command } from "commander";
import type { ICommandLineOptions } from "../types/cli";

export function parseCommand(): ICommandLineOptions {
  const command = new Command();

  command
    .name("asana-monthly-report")
    .description('Export completed tasks from Asana for the selected month.')
    .requiredOption('--token <token>', 'Asana personal access token')
    .requiredOption('--workspace <gid>', 'Asana workspace GID')
    .requiredOption('--month <YYYY-MM>', 'Month to export, e.g. 2026-09')
    .requiredOption('--format <format>', 'Output format: csv or xlsx', 'csv')
    .requiredOption("--assignee <gid>", "Asana user GID")
    .requiredOption("--output <path>", "Output file path")
    .option('--timezone <timezone>', 'IANA timezone used to determine the month boundaries', 'Europe/Warsaw',);

  command.parse();

  const options = command.opts<ICommandLineOptions>();

  return options;
}