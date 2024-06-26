import { Injectable, signal } from '@angular/core'
import { toObservable } from '@angular/core/rxjs-interop'
import { moment } from '../helpers/date'

@Injectable({
  providedIn: 'root',
})
export class FilterStoreService {
  constructor() {}

  queryParms = signal({
    lineCode: '11',
    date: this.lastMonths[0].formated,
    untilToday: false,
    region: '',
  })

  queryParms$ = toObservable(this.queryParms)

  get lastMonths(): any {
    const months = []
    for (let i = 1; i < 7; i++) {
      const today = new Date()
      today.setMonth(today.getMonth() - i)
      today.setDate(1)
      months.push({
        value: today.getTime(),
        formated: moment(today).format('YYYY-MM-DD'),
        date: today,
      })
    }

    return months
  }
}
