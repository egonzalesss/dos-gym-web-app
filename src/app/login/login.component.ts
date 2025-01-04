import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgxSpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  toastR = inject(ToastrService);
  spinner = inject(NgxSpinnerService);

  user: User = new User();

  constructor() {}

  onLogIn(form: any): void {
    this.spinner.show();
    this.authService
      .login(this.user)
      .then(() => {
        this.toastR.success('', 'Login was successful!');
        this.router.navigateByUrl('/home');
        this.spinner.hide();
      })
      .catch((error) => {
        console.log(error);
        this.toastR.error(
          'Credentials are invalid. Please try again.',
          'Oops!'
        );
        this.spinner.hide();
      });
  }
}
