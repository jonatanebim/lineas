import { WeekDay } from '@angular/common'

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
export class DayWeek {
  numberDay!: WeekDay
  descriptionDay?: string
}
export const isValidDate = (d: any) => {
  const timestamp = Date.parse(d)
  const ok = isNaN(timestamp) == false
  return ok
}

export const parseDateCombined = (date: any) => {
  let timestamp = Date.parse(date.replace(/[ap]m$/i, ''))
  if (date.match(/pm$/i) >= 0) {
    timestamp += 12 * 60 * 60 * 1000
  }
  return timestamp
}

type DateStringYYYYMMDD =
  | 'YYYY-MM-DD'
  | 'YYYY-MM-DD hh'
  | 'YYYY-MM-DD hh:mm'
  | 'YYYY-MM-DD hh:mm:ss'
  | 'YYYY.MM.DD'
  | 'YYYY.MM.DD hh'
  | 'YYYY.MM.DD hh:mm'
  | 'YYYY.MM.DD hh:mm:ss'
  | 'YYYY/MM/DD'
  | 'YYYY/MM/DD hh'
  | 'YYYY/MM/DD hh:mm'
  | 'YYYY/MM/DD hh:mm:ss'
  | 'YYYY-DD'
  | 'YYYY.dd'
  | 'DD-MM-YYYY'
  | 'DD-MM-YYYY hh'
  | 'DD-MM-YYYY hh:mm'
  | 'DD-MM-YYYY hh:mm:ss'
  | 'DD.MM.YYYY'
  | 'DD.MM.YYYY hh'
  | 'DD.MM.YYYY hh:mm'
  | 'DD.MM.YYYY hh:mm:ss'
  | 'DD/MM/YYYY'
  | 'DD/MM/YYYY hh'
  | 'DD/MM/YYYY hh:mm'
  | 'DD/MM/YYYY hh:mm:ss'
  | 'YYYY-DD'
  | 'YYYY/DD'
  | 'YYYY.DD'
  | 'DD-YYYY'
  | 'DD/YYYY'
  | 'DD.YYYY'
  | 'YYYY-MM'
  | 'YYYY/MM'
  | 'YYYY.MM'
  | 'MM-YYYY'
  | 'MM/YYYY'
  | 'MM.YYYY'
  | 'YYYY'
  | 'DD-MM'
  | 'MM-DD'
  | 'MM.DD'
  | 'DD.MM'
  | 'DD'
  | 'hh'
  | 'mm'
  | 'MM'

interface Moment {
  date: Date
  format(format: DateStringYYYYMMDD): string
  getDateNameFull(): string
  subtract(quantity: number, type: 'day' | 'week' | 'month' | 'year'): Date
  add(quantity: number, type: 'day' | 'week' | 'month' | 'year'): Date
  getDateDiff(
    date1: Date,
    date2: Date,
    unit: 'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days' | 'months' | 'years'
  ): number
  parseDate(date: string | Date): Date | undefined
  getDayAndMonthNames(): { dayName: string; monthName: string }
  getStartAndEndDateOfMonth(): { startDate: Date; endDate: Date }
  toDate(): Date
  minDateTwoDate(date1: Date | string, date2: Date | string): Date
}

function parseDateStringToDate(dateString: string): string {
  // Verificar que la cadena de texto tenga el formato esperado
  const regex = /^\d{4}\.\d{2}\.\d{2}$/
  if (!regex.test(dateString)) {
    const regex = /^\d{2}\.\d{2}\.\d{4}$/
    if (!regex.test(dateString)) {
      console.error('La cadena de texto no tiene el formato esperado.')
      return ''
    } else {
      const [day, month, year] = dateString.split('.')
      return `${day}-${month}-${year}`
    }
  } else {
    const [year, month, day] = dateString.split('.')
    return `${year}-${month}-${day}`
  }
}

function parseDate(date: string | Date): Date | undefined {
  const points = typeof date === 'string' ? date.split('.')?.length : 0
  const englishRegex = /^\d{4}-\d{2}-\d{2}$/
  const spañishRegex = /^\d{2}-\d{2}-\d{4}$/
  if (typeof date === 'string' && date.toString().indexOf('T') > -1) {
    date = new Date(date)
  }
  if (typeof date === 'string' && points > 1) {
    date = parseDateStringToDate(date)
  }
  if (typeof date === 'string') {
    date = date.replace(/\//g, '-')
  }

  if (date instanceof Date) {
    return date
  } else if (typeof date === 'string' && englishRegex.test(date.substring(0, 10))) {
    const [dateCurrent, time] = date.split(' ')
    const [year, month, day] = dateCurrent.split('-').map((x) => parseInt(x))
    const [hour, minute, second] = time ? time.split(':').map((x) => parseInt(x)) : [0, 0, 0]
    const parsedDate = new Date(year, month - 1, day, hour ? hour : 0, minute ? minute : 0, second ? second : 0)
    return isNaN(parsedDate.getTime()) ? undefined : parsedDate
  } else if (typeof date === 'string' && spañishRegex.test(date.substring(0, 10))) {
    const [dateCurrent, time] = date.split(' ')
    const [day, month, year] = dateCurrent.split('-').map((x) => parseInt(x))
    const [hour, minute, second] = time ? time.split(':').map((x) => parseInt(x)) : [0, 0, 0]
    const parsedDate = new Date(year, month - 1, day, hour ? hour : 0, minute ? minute : 0, second ? second : 0)
    return isNaN(parsedDate.getTime()) ? undefined : parsedDate
  } else {
    throw new Error('Invalid input type')
  }
}

export function moment(date?: any): Moment {
  const obj: Moment | any = {
    date: (date ? parseDate(date) : new Date()) as Date,
    format: function (format: DateStringYYYYMMDD) {
      const year = this.date.getFullYear()
      let month = this.date.getMonth() + 1
      if (month < 10) {
        month = +`0${month}`
      }
      let day = this.date.getDate()
      if (day < 10) {
        day = +`0${day}`
      }
      let hour = this.date.getHours()
      if (hour < 10) {
        hour = +`0${hour}`
      }
      let minute = this.date.getMinutes()
      if (minute < 10) {
        minute = +`0${minute}`
      }
      let second = this.date.getSeconds()
      if (second < 10) {
        second = +`0${second}`
      }

      const dateFormat = format
        .replace('YYYY', `${year}`)
        .replace('MM', `${month}`)
        .replace('DD', `${day}`)
        .replace('hh', `${hour}`)
        .replace('mm', `${minute}`)
        .replace('ss', `${second}`)
      return dateFormat
    },
    subtract: function (quantity: number, type: 'day' | 'week' | 'month' | 'year'): Date {
      const fechaActual: Date = this.date // fecha actual
      let fechaRestada: Date

      switch (type) {
        case 'day':
          fechaRestada = new Date(fechaActual.getTime() - quantity * 24 * 60 * 60 * 1000)
          break
        case 'week':
          fechaRestada = new Date(fechaActual.getTime() - quantity * 7 * 24 * 60 * 60 * 1000)
          break
        case 'month':
          fechaRestada = new Date(fechaActual.getFullYear(), fechaActual.getMonth() - quantity, fechaActual.getDate())
          break
        case 'year':
          fechaRestada = new Date(fechaActual.getFullYear() - quantity, fechaActual.getMonth(), fechaActual.getDate())
          break
        default:
          throw new Error('Tipo de tiempo no válido')
      }

      return fechaRestada
    },
    add: function (quantity: number, type: 'day' | 'week' | 'month' | 'year'): Date {
      const fechaActual: Date = this.date // fecha actual
      let fechaRestada: Date

      switch (type) {
        case 'day':
          fechaRestada = new Date(fechaActual.getTime() + quantity * 24 * 60 * 60 * 1000)
          break
        case 'week':
          fechaRestada = new Date(fechaActual.getTime() + quantity * 7 * 24 * 60 * 60 * 1000)
          break
        case 'month':
          fechaRestada = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + quantity, fechaActual.getDate())
          break
        case 'year':
          fechaRestada = new Date(fechaActual.getFullYear() + quantity, fechaActual.getMonth(), fechaActual.getDate())
          break
        default:
          throw new Error('Tipo de tiempo no válido')
      }

      return fechaRestada
    },
    getDateNameFull: function () {
      const day = moment(this.date).format('DD')
      const monthName = moment(this.date).getDayAndMonthNames()?.monthName
      const year = moment(date).format('YYYY')

      const nombreDia = moment(date).getDayAndMonthNames()?.dayName
      return `${capitalize(nombreDia)} ${day} de  ${capitalize(monthName)} ${year}`
    },
    parseDate: function (date: string | Date) {
      return parseDate(date)
    },
    getDayAndMonthNames: function (): { dayName: string; monthName: string } {
      // Obtener el nombre del día en español
      const optionsDay: Intl.DateTimeFormatOptions = { weekday: 'long', timeZone: 'America/New_York' }
      const dayName = this.date.toLocaleString('es-ES', optionsDay)

      // Obtener el nombre del mes en español
      const optionsMonth: Intl.DateTimeFormatOptions = { month: 'long', timeZone: 'America/New_York' }
      const monthName = this.date.toLocaleString('es-ES', optionsMonth)

      return { dayName, monthName }
    },
    getStartAndEndDateOfMonth: function (): { startDate: Date; endDate: Date } {
      const date = this.date
      // Obtener el año y mes de la fecha
      const year = date.getFullYear()
      const month = date.getMonth()

      // Obtener la fecha de inicio del mes
      const startDate = new Date(year, month, 1)

      // Obtener la fecha de fin del mes
      const endDate = new Date(year, month + 1, 0)

      // Devolver las fechas de inicio y fin del mes
      return { startDate, endDate }
    },
    toDate: function () {
      return this.date
    },
  }

  return obj
}

export function getTimeInRangeDateEndTime(date: any, now: any) {
  const elapsedTimeInSeconds = getRangeEndTime(date)
  const timeInCurrentRange = Math.max(0, Math.floor((elapsedTimeInSeconds.getTime() - now.getTime()) / 1000))
  return timeInCurrentRange
}

export function getRangeEndTime(orderDate: Date): Date {
  const horaFinal = new Date(orderDate)

  const hour = orderDate.getHours()
  const minutos = orderDate.getMinutes()

  if (minutos < 15) {
    horaFinal.setHours(hour, 14, 59)
  } else if (minutos < 30) {
    horaFinal.setHours(hour, 29, 59)
  } else if (minutos < 45) {
    horaFinal.setHours(hour, 44, 59)
  } else {
    horaFinal.setHours(hour, 59, 59)
  }
  return horaFinal
}

export const DAYWEEK: DayWeek[] = [
  {
    numberDay: WeekDay.Monday,
    descriptionDay: 'Lunes',
  },
  {
    numberDay: WeekDay.Tuesday,
    descriptionDay: 'Martes',
  },
  {
    numberDay: WeekDay.Wednesday,
    descriptionDay: 'Miércoles',
  },
  {
    numberDay: WeekDay.Thursday,
    descriptionDay: 'Jueves',
  },
  {
    numberDay: WeekDay.Friday,
    descriptionDay: 'Viernes',
  },
  {
    numberDay: WeekDay.Saturday,
    descriptionDay: 'Sábado',
  },
  {
    numberDay: WeekDay.Sunday,
    descriptionDay: 'Domingo',
  },
]
