import { provideServerRendering, withAppShell, withRoutes } from '@angular/ssr';
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { appConfig } from './app.config';
import { ROUTES } from '@angular/router';
import { AppShellComponent } from './modules/app-shell/app-shell.component';
import { serverRoutes } from './app.routes.server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(
      withRoutes(serverRoutes),
      withAppShell(AppShellComponent),
    ),
    {
      provide: ROUTES,
      multi: true,
      useValue: [
        {
          path: 'shell',
          component: AppShellComponent,
        },
      ],
    },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
