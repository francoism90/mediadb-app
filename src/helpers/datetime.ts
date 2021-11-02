import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';

dayjs.extend(duration);
dayjs.extend(utc);

export const timeFormat = (value: number | undefined) => dayjs((value || 0) * 1000)
  .utc()
  .format('HH:mm:ss')
  .replace(/^0(?:0:0?)?/, '');

export const dateFormat = (value: string | number | undefined) => dayjs(value || Date.now())
  .format('D MMMM YYYY');
