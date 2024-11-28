import { Routes } from '@angular/router';
import { BroListCreateComponent } from './bro-list-create/bro-list-create.component';
import { RegistrationComponent } from './registration/registration.component';

export const routes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'bro-lock-list/create', component: BroListCreateComponent },
];
