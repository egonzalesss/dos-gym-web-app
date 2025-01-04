import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  authService = inject(AuthService);
  router = inject(Router);
  toastR = inject(ToastrService);

  user: User = new User();

  constructor() {}

  onSignUp(form: any): void {
    this.authService
      .signUp(this.user)
      .then(() => {
        this.toastR.success('Account created successfully.', 'Success!');
        this.router.navigateByUrl('/home');
      })
      .catch((error) => {
        this.toastR.error(
          'Credentials are invalid. Please try again.',
          'Oops!'
        );
      });
  }

  onLogIn(form: any): void {
    this.authService
      .login(this.user)
      .then(() => {
        this.toastR.success('', 'Login was successful!');
        this.router.navigateByUrl('/home');
      })
      .catch((error) => {
        console.log(error);
        this.toastR.error(
          'Credentials are invalid. Please try again.',
          'Oops!'
        );
      });
  }
}
