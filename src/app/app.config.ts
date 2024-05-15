import { ApplicationConfig, LOCALE_ID, isDevMode } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withHashLocation,
  withPreloading,
  withRouterConfig,
  withViewTransitions,
} from '@angular/router';

import { inMemoryScrollingFeature, routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { DatePipe, provideImgixLoader } from '@angular/common';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

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
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideImgixLoader('https://extranet.quimicasuiza.com/'),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
  ],
};
