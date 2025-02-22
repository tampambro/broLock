import { Routes } from '@angular/router';
import { BroListCreateComponent } from './bro-list-create/bro-list-create.component';
import { SingupComponent } from './singup/singup.component';
import { LoginComponent } from './login/login.component';
import { EmailConfirmComponent } from './email-confirm/email-confirm.component';

export const routes: Routes = [
  { path: 'singup', component: SingupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'email-confirm', component: EmailConfirmComponent },
  { path: 'bro-lock-list/create', component: BroListCreateComponent },
];
