export default function useFilters () {
  const formatTimestamp = (value: number): string => {
    return new Date(value * 1000)
      .toISOString()
      .substr(11, 8)
      .replace(/^0(?:0:0?)?/, '')
  }

  return {
    formatTimestamp
  }
}
