import { writeFile } from 'node:fs/promises';

import ora from 'ora';

import type { Rows } from '../../types/common';

const headers = ['ID', 'Completed At', 'Project', 'Title', 'URL'];

function escapeCsv(value: unknown): string {
  return `"${String(value ?? '').replace(/"/g, '""')}"`;
}

export async function generateCsv(rows: Rows[], filePath: string): Promise<void> {
  const spinner = ora('Generating CSV report...').start();

  try {
    const csvContent = [
      headers.map(escapeCsv).join(','),
      ...rows.map((row) =>
        [row.id, row.completed_at, row.project, row.title, row.url]
          .map(escapeCsv)
          .join(',')
      )
    ].join('\r\n');

    await writeFile(filePath, `\uFEFF${csvContent}`, 'utf8');
    spinner.succeed('CSV report generated.');
  } catch (error) {
    spinner.fail('Failed to generate CSV report.');
    throw error;
  }
}
