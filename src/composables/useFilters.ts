import dayjs from 'dayjs';

export default function useFilters() {
  const formatTime = (value: number): string => new Date(value * 1000)
    .toISOString()
    .substr(11, 8)
    .replace(/^0(?:0:0?)?/, '');

  const formatDate = (value: string | number | Date): string => dayjs(value)
    .format('D MMMM YYYY');

  const formatTitle = (value: string[]): string => value.filter((n) => n)
    .join(' - ');

  return {
    formatDate,
    formatTime,
    formatTitle,
  };
}
