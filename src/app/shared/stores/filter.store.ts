import { Injectable, signal } from '@angular/core'
import { toObservable } from '@angular/core/rxjs-interop'
import { moment } from '../helpers/date'
import { DEFAULT_STORE } from '../constants/globals'

@Injectable({
  providedIn: 'root',
})
export class FilterStoreService {
  constructor() {}

  months: any[] = []
  queryParms = signal({
    ...DEFAULT_STORE,
    datetime: this.getLastMonths()[0].value,
    date: this.getLastMonths()[0].formated,
  })
  queryParms$ = toObservable(this.queryParms)

  getLastMonths(): any {
    if (this.months.length !== 6) {
      for (let i = 1; i <= 6; i++) {
        const today = new Date()
        today.setMonth(today.getMonth() - i)
        today.setDate(1)
        this.months.push({
          value: today.getTime(),
          formated: moment(today).format('YYYY-MM-DD'),
          date: today,
        })
      }
    }

    return this.months
  }

  resetParams() {
    this.queryParms.update(() => ({
      ...DEFAULT_STORE,
      datetime: this.getLastMonths()[0].value,
      date: this.getLastMonths()[0].formated,
    }))
  }
}
