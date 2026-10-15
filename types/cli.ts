import type { ExportFormat } from "./common";

export interface ICommandLineOptions {
  assignee: string;
  format: ExportFormat;
  month: string;
  output: string;
  timezone: string;
  token: string;
  workspace: string;
}