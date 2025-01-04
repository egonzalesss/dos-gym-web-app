import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { collection, Firestore } from '@angular/fire/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);

  constructor() {}

  signUp(user: any): Promise<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      user.email,
      user.password
    ).then((response) => {
      updateProfile(response.user, { displayName: user.username });
    });
    return promise;
  }

  login(user: any): Promise<any> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      user.email,
      user.password
    );
    return promise;
  }
}
