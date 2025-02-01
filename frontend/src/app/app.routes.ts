import { Routes } from '@angular/router';
import { BroListCreateComponent } from './bro-list-create/bro-list-create.component';
import { SingupComponent } from './singup/singup.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'singup', component: SingupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'bro-lock-list/create', component: BroListCreateComponent },
];
