import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  redirectUrl: string | null = null;

  constructor() {}

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }

    const decodedToken: JwtPayload = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime < decodedToken.exp!;
  }

  public setToken(token: string): void {
    if (token) {
      localStorage.setItem('token', token);
      // todo: decode token and set user in local storage
    }
  }

  public signUp(user: User): Promise<UserCredential> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      user.email,
      user.password
    );
    // .then((response) => {
    //   updateProfile(response.user, { displayName: user.username });
    // });
    return promise;
  }

  public login(user: User): Promise<UserCredential> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      user.email,
      user.password
    );
    return promise;
  }
}
