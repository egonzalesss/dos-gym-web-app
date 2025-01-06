import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { loginAuthGuard } from './shared/guards/login-auth.guard';
import { appAuthGuard } from './shared/guards/app-auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [loginAuthGuard] },
  { path: 'signup', component: SignUpComponent, canActivate: [loginAuthGuard] },
  { path: '', component: HomeComponent, canActivate: [appAuthGuard] },
  { path: '**', redirectTo: '' },
];
