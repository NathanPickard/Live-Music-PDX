import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent {

  constructor(private authService: AuthService,
    public snackBar: MatSnackBar) { }

  loginForm: FormGroup;

  ngOnInit() {
    this.loginForm = new FormGroup({
      'userData': new FormGroup({
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
      })
    })
  }

  onLogin() {
    console.log(this.loginForm);
    const email = this.loginForm.value.userData.email;
    const password = this.loginForm.value.userData.password;
    this.authService.loginUser(email, password);


  }

  openSnackBar() {
    this.snackBar.openFromComponent(LoginSnackbar, {
      duration: 1000,
    });
  }

  // onLogin(form: NgForm) {
  //   const email = form.value.email;
  //   const password = form.value.password;
  //   this.authService.loginUser(email, password);
  // }
}


@Component({
  selector: 'login-snackbar',
  templateUrl: 'login-snackbar.component.html',
})

export class LoginSnackbar { }