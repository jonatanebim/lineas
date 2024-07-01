import { Injectable, signal } from '@angular/core'
import { toObservable } from '@angular/core/rxjs-interop'

@Injectable({
  providedIn: 'root',
})
export class GlobalStoreService {
  constructor() {}

  isLoading = signal(true)
  isLoading$ = toObservable(this.isLoading)

  reloadRegions: any = signal(null)
  reloadRegions$ = toObservable(this.reloadRegions)

  filterCategories: any = signal(null)
  filterCategories$ = toObservable(this.filterCategories)

  reloadCategories: any = signal(null)
  reloadCategories$ = toObservable(this.reloadCategories)

  showLoading() {
    this.isLoading.set(true)
  }

  hideLoading() {
    setTimeout(() => this.isLoading.set(false))
  }
}
