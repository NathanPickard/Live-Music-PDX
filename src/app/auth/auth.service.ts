import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

// import * as firebase from 'firebase';
import * as firebase from 'firebase/app';
import 'firebase/auth';


@Injectable()
export class AuthService {

  token: string;

  constructor(private router: Router) { }

  registerUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(response => {
        this.router.navigate(['/']);
      })
      .catch(
        error => console.log(error)
      );
  }

  loginUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(response => {
        this.router.navigate(['/']);
        firebase.auth().currentUser.getIdToken()
          .then((token: string) => this.token = token);
      }
      )
      .catch(
        error => console.log(error)
      );
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then((token: string) => this.token = token);
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

  loadUser() {
    firebase.auth().onAuthStateChanged((currentUser) => {
      // console.log(currentUser);
      if (currentUser === null) {
        this.token = null;
      } else {
        currentUser.getIdToken().then(
          (token: string) => this.token = token
        );
      }
    });
  }

}
