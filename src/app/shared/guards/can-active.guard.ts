import { inject } from '@angular/core'
import { CanActivateFn } from '@angular/router'
import { LocalStorageService } from 'ngx-webstorage'

export const canActiveGuard: CanActivateFn = (route, state) => {
  const localSt = inject(LocalStorageService)
  return !!localSt.retrieve('user')
}
