import { mkdir } from 'node:fs/promises';
import path from 'node:path';

import chalk from 'chalk';
import ora from 'ora';

import { generateCsv } from './generateCsv';
import { generateXlsx } from './generateExcel';

import { formatDate } from '../formatDate';

import type { AsanaTask } from '../../types/asana';
import type { Rows } from '../../types/common';

const getProjectNames = (task: AsanaTask): string => {
  const projects = task?.parent ? task.parent.projects : task?.projects ?? [];

  return projects.map((project) => project.name).filter(Boolean).join(', ');
};

async function exportReport(
  tasks: AsanaTask[],
  fileName: string
): Promise<void> {
  const spinner = ora('Preparing report files...').start();

  try {
    const reportsDir = path.resolve(process.cwd(), 'reports');
    await mkdir(reportsDir, { recursive: true });

    const rows: Rows[] = tasks.map((task) => ({
      id: task.gid,
      completed_at: task?.completed_at ? formatDate(task.completed_at) : '',
      project: getProjectNames(task),
      title: task.name,
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
