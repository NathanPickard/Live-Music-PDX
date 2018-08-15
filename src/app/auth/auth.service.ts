import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  registerUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(
        error => console.log(error)
      )
  }

  token: string;

  constructor(private router: Router) { }
}