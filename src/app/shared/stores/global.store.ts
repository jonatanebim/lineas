import { Injectable, Signal, signal } from '@angular/core'
import { toObservable } from '@angular/core/rxjs-interop'

@Injectable({
  providedIn: 'root',
})
export class GlobalStoreService {
  constructor() {}

  isLoading = signal(true)
  reloadRegions: any = signal(null)
  reloadRegions$ = toObservable(this.reloadRegions)

  showLoading() {
    setTimeout(() => this.isLoading.set(true))
  }

  hideLoading() {
    this.isLoading.set(false)
  }
}
