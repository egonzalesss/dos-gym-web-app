import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'home', component: HomeComponent },
];
