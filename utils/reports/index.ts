import { mkdir } from 'node:fs/promises';
import path from 'node:path';

import chalk from 'chalk';
import ora from 'ora';

import { generateCsv } from './generateCsv';
import { generateXlsx } from './generateExcel';

import type { AsanaTask } from '../../types/asana';
import type { Rows } from '../../types/common';

async function exportReport(
  tasks: AsanaTask[],
  fileName: string
): Promise<void> {
  const spinner = ora('Preparing report files...').start();

  try {
    const reportsDir = path.resolve(process.cwd(), 'reports');
    await mkdir(reportsDir, { recursive: true });

    const rows: Rows[] = tasks.map((task) => ({
      name: task.name,
      completed_at: task.completed_at ?? '',
      assignee: task.assignee?.name ?? '',
      url: task.permalink_url ?? ''
    }));

    const xlsxPath = path.join(reportsDir, `${fileName}.xlsx`);
    const csvPath = path.join(reportsDir, `${fileName}.csv`);

    spinner.succeed('Report files prepared.');

    await generateXlsx(rows, xlsxPath);
    await generateCsv(rows, csvPath);

    console.log(`\n${chalk.green.bold('Report generated successfully:')}`);
    console.log(`${chalk.blue('XLSX:')} ${chalk.cyan(xlsxPath)}`);
    console.log(`${chalk.blue('CSV: ')} ${chalk.cyan(csvPath)}`);

  } catch (error) {
    spinner.fail('Failed to prepare reports.');
    throw error;
  }
}

export default exportReport;
