import format from 'date-fns/format'

export const dateFormatter = (date: number|string, formatString: string = 'dd-MM-yyyy h:m:s') => {
  if (typeof date === 'undefined' || !date) {
    return ''
  }

  return format(new Date(date), formatString);
}