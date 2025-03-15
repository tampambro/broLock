import { Routes } from '@angular/router';
import { BroListCreateComponent } from '@modules/bro-list-create/bro-list-create.component';
import { SignupComponent } from '@modules/signup/signup.component';
import { LoginComponent } from '@modules/login/login.component';
import { EmailConfirmComponent } from '@modules/email-confirm/email-confirm.component';

export const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'email-confirm/:userName', component: EmailConfirmComponent },
  { path: 'bro-lock-list/create', component: BroListCreateComponent },
];
