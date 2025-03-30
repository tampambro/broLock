import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { ROUTES } from '@angular/router';
import { AppShellComponent } from './modules/app-shell/app-shell.component';
import { provideServerRouting, withAppShell } from '@angular/ssr';
import { serverRoutes } from './app.routes.server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRouting(serverRoutes, withAppShell(AppShellComponent)),
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
