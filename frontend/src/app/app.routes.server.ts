import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Client,
  },
  { path: 'signup', renderMode: RenderMode.Prerender },
  { path: 'login', renderMode: RenderMode.Prerender },
  {
    path: 'email-confirm/:linkHash',
    renderMode: RenderMode.Server,
  },
  { path: 'bro-lock-list/create', renderMode: RenderMode.Server },
  { path: 'profile', renderMode: RenderMode.Server },
  { path: '**', renderMode: RenderMode.Prerender },
];
