import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { BASE_API_URL } from '@const/tokens';
import { environment } from '@env';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideClientHydration } from '@angular/platform-browser';
import { tokenInterceptor } from './shared/interceptors/token.interceptor';
import { unauthorizedInterceptor } from './shared/interceptors/unauthorized.interceptor';
import { provideNgxSkeletonLoader } from 'ngx-skeleton-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([tokenInterceptor, unauthorizedInterceptor]),
    ),
    {
      provide: BASE_API_URL,
      useValue: environment.apiUrl,
    },
    provideAnimations(),
    provideNgxSkeletonLoader(),
  ],
};
