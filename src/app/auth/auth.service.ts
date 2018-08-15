import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  registerUser(email: string, password: string) {

  }
  
  token: string;

  constructor(private router: Router) { }
}