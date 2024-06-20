import { Injectable, signal } from '@angular/core'
import { toObservable } from '@angular/core/rxjs-interop'

@Injectable({
  providedIn: 'root',
})
export class FilterStoreService {
  constructor() {}

  queryParms = signal({
    lineCode: '11',
    date: '2024-05-01',
    untilToday: false,
    region: '',
  })
  queryParms$ = toObservable(this.queryParms)
}
