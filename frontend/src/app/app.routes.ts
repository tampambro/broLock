import { Routes } from '@angular/router';
import { BroListCreateComponent } from '@modules/bro-list-create/bro-list-create.component';
import { SignupComponent } from '@modules/signup/signup.component';
import { LoginComponent } from '@modules/login/login.component';
import { EmailConfirmComponent } from '@modules/email-confirm/email-confirm.component';
import { WelcomePageComponent } from '@modules/welcome-page/welcome-page.component';
import { emailConfirmGuard } from '@guards/email-confirm.guard';
import { NotFoundComponent } from '@modules/not-found/not-found.component';
import { ProfileComponent } from '@modules/profile/profile.component';
import { authGuard } from '@guards/auth.guard';
import { ForgotPasswordComponent } from '@modules/forgot-password/forgot-password.component';

export const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: 'email-confirm/:linkHash',
    component: EmailConfirmComponent,
    canActivate: [emailConfirmGuard],
    pathMatch: 'full',
  },
  { path: 'bro-lock-list/create', component: BroListCreateComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: '**', component: NotFoundComponent },
];
