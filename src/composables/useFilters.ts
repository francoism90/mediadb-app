import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import { getResolution } from 'src/services/player';

export default function useFilters() {
  dayjs.extend(duration);
  dayjs.extend(utc);

  const formatTime = (value?: number) => dayjs((value || 0) * 1000)
    .utc()
    .format('HH:mm:ss')
    .replace(/^0(?:0:0?)?/, '');

  const formatDate = (value?: string | number | Date) => dayjs(value || Date.now()).format('D MMMM YYYY');
  const formatResolution = (height: number, width: number) => getResolution(height, width);
  const formatTitle = (value: string[]) => value.filter((n) => n).join(' - ');

  return {
    formatDate,
    formatResolution,
    formatTime,
    formatTitle,
  };
}
