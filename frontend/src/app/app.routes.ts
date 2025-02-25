import { Routes } from '@angular/router';
import { BroListCreateComponent } from '@modules/bro-list-create/bro-list-create.component';
import { SingupComponent } from '@modules/singup/singup.component';
import { LoginComponent } from '@modules/login/login.component';
import { EmailConfirmComponent } from '@modules/email-confirm/email-confirm.component';

export const routes: Routes = [
  { path: 'singup', component: SingupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'email-confirm', component: EmailConfirmComponent },
  { path: 'bro-lock-list/create', component: BroListCreateComponent },
];
