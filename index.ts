import cli from './cli';

cli().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));

  process.exitCode = 1;
});
