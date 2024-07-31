import { APP_INITIALIZER, ApplicationConfig, LOCALE_ID } from '@angular/core'
import esPE from '@angular/common/locales/es-PE'
import {
  PreloadAllModules,
  Router,
  provideRouter,
  withComponentInputBinding,
  withHashLocation,
  withPreloading,
  withRouterConfig,
  withViewTransitions,
} from '@angular/router'
import { registerLocaleData } from '@angular/common'

import { inMemoryScrollingFeature, routes } from './app.routes'
import { DatePipe } from '@angular/common'
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http'
import { provideAnimations } from '@angular/platform-browser/animations'
import { ApiInterceptorRequest } from './shared/interceptors/api.interceptor'
import {
  LocalStorageService,
  provideNgxWebstorage,
  withLocalStorage,
  withNgxWebstorageConfig,
  withSessionStorage,
} from 'ngx-webstorage'
import { Observable, from, tap } from 'rxjs'

registerLocaleData(esPE)

const loadCurrentData = (router: Router, localSt: LocalStorageService) => {
  return (): Observable<any> =>
    from(new Promise((res) => setTimeout(res, 500))).pipe(
      tap(() => {
        const user = localSt.retrieve('user')
        if (user) {
          router.navigate(['/dashboard'])
        }
      })
    )
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideNgxWebstorage(
      withNgxWebstorageConfig({
        separator: ':',
        caseSensitive: true,
      }),
      withLocalStorage(),
      withSessionStorage()
    ),
    DatePipe,
    {
      provide: APP_INITIALIZER,
      useFactory: loadCurrentData,
      multi: true,
      deps: [Router, LocalStorageService],
    },
    { provide: LOCALE_ID, useValue: 'es-PE' },
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptorRequest,
      multi: true,
    },
    provideRouter(
      routes,
      inMemoryScrollingFeature,
      withPreloading(PreloadAllModules),
      withRouterConfig({
        onSameUrlNavigation: 'reload',
      }),
      withHashLocation(),
      withViewTransitions(),
      withComponentInputBinding()
    ),
  ],
}
