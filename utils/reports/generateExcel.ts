import ExcelJS from 'exceljs';
import ora from 'ora';

import type { Rows } from '../../types/common';

const columns = [
  { header: 'ID', key: 'id', width: 20 },
  { header: 'Completed At', key: 'completed_at', width: 40 },
  { header: 'Project', key: 'project', width: 60 },
  { header: 'Title', key: 'title', width: 120 },
  { header: 'URL', key: 'url', width: 300 }
];

export async function generateXlsx(rows: Rows[], filePath: string): Promise<void> {
  const spinner = ora('Generating XLSX report...').start();

  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Completed Tasks');

    worksheet.columns = columns;
    worksheet.addRows(rows);
    worksheet.getRow(1).font = { bold: true };
    worksheet.views = [{ state: 'frozen', ySplit: 1 }];

    for (let i = 2; i <= worksheet.rowCount; i++) {
      const cell = worksheet.getCell(i, 4);

      if (cell.value) {
        const url = String(cell.value);
        cell.value = { text: url, hyperlink: url };
      }
    }

    await workbook.xlsx.writeFile(filePath);
    spinner.succeed('XLSX report generated.');
  } catch (error) {
    spinner.fail('Failed to generate XLSX report.');
    throw error;
  }
}
