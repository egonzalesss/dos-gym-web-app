import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/User';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgxSpinnerModule],
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

  public async onLogIn(): Promise<void> {
    this.spinner.show();
    try {
      var authResult = await this.authService.login(this.user);
      this.authService.setToken(await authResult.user.getIdToken());
      this.spinner.hide();
      this.toastR.success('', 'Login was successful!');
      this.router.navigateByUrl('/home');
    } catch (error) {
      //todo: implement proper error handling because not all errors are going to be about credentials
      console.log(error);
      this.toastR.error('Credentials are invalid. Please try again.', 'Oops!');
      this.spinner.hide();
    }
  }
}
