import type { ICommandLineOptions } from "../types/cli";

export function validateOptions(options: ICommandLineOptions): void {
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(options.month)) {
    throw new Error("--month must use YYYY-MM format");
  }

  if (!["csv", "xlsx"].includes(options.format)) {
    throw new Error("--format must be csv or xlsx");
  }

  const extension = options.format === "csv" ? ".csv" : ".xlsx";

  if (!options.output.toLowerCase().endsWith(extension)) {
    throw new Error(`--output must end with ${extension}`);
  }

  try {
    new Intl.DateTimeFormat("en", { timeZone: options.timezone });
  } catch {
    throw new Error(`Invalid timezone: ${options.timezone}`);
  }
}
