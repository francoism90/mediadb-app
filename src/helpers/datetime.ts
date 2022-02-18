import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';

dayjs.extend(duration);
dayjs.extend(utc);

export const timeFormat = (value: number | undefined, format?: string) => dayjs((value || 0) * 1000)
  .utc()
  .format(format || 'HH:mm:ss')
  .replace(/^0(?:0:0?)?/, '');

export const dateFormat = (value: string | undefined, format?: string) => dayjs(value || Date.now())
  .format(format || 'D MMMM YYYY');
