import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, NgxSpinnerModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  authService = inject(AuthService);
  router = inject(Router);
  toastR = inject(ToastrService);
  spinner = inject(NgxSpinnerService);

  user: User = new User();

  constructor() {}

  public async onSignUp(): Promise<void> {
    this.spinner.show();
    try {
      var authResult = await this.authService.signUp(this.user);
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
