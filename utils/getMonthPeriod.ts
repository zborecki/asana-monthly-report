import { fromZonedTime } from 'date-fns-tz';

export function getMonthPeriod(month: string, timezone: string) {
  const [year, monthNumber] = month.split('-').map(Number);

  if (
    year === undefined ||
    monthNumber === undefined ||
    !Number.isInteger(year) ||
    !Number.isInteger(monthNumber) ||
    monthNumber < 1 ||
    monthNumber > 12
  ) {
    throw new Error(`Invalid month format: ${month}. Expected YYYY-MM.`);
  }

  const nextYear = monthNumber === 12 ? year + 1 : year;
  const nextMonth = monthNumber === 12 ? 1 : monthNumber + 1;

  const start = fromZonedTime(`${month}-01T00:00:00`, timezone);

  const nextMonthString =
    `${nextYear}-${String(nextMonth).padStart(2, '0')}`;

  const end = fromZonedTime(
    `${nextMonthString}-01T00:00:00`,
    timezone
  );

  return { start, end };
}
