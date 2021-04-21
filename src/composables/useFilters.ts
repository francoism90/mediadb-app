import dayjs from 'dayjs'

export default function useFilters () {
  const formatTime = (value: number): string => {
    return new Date(value * 1000)
      .toISOString()
      .substr(11, 8)
      .replace(/^0(?:0:0?)?/, '')
  }

  const formatDate = (value: string | number | Date): string => {
    return dayjs(value).format('D MMMM YYYY')
  }

  return {
    formatDate,
    formatTime
  }
}
