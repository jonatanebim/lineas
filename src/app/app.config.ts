import { ApplicationConfig, LOCALE_ID } from '@angular/core'
import esPE from '@angular/common/locales/es-PE'
import {
  PreloadAllModules,
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

registerLocaleData(esPE)

export const appConfig: ApplicationConfig = {
  providers: [
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
    DatePipe,
    { provide: LOCALE_ID, useValue: 'es-PE' },
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptorRequest,
      multi: true,
    },
  ],
}
