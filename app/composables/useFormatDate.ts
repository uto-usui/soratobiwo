import dayjs from 'dayjs'

export function useFormatDate() {
  const formatDate = (date: string, format: string = 'YYYY.MM.DD.ddd') => {
    return dayjs(date).format(format)
  }

  return {
    formatDate,
  }
}
