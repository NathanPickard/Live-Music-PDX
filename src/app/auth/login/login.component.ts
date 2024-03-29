import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
    public snackBar: MatSnackBar) { }

  loginForm: UntypedFormGroup;

  ngOnInit() {
    this.loginForm = new UntypedFormGroup({
      'userData': new UntypedFormGroup({
        'email': new UntypedFormControl(null, [Validators.required, Validators.email]),
        'password': new UntypedFormControl(null, [Validators.required, Validators.minLength(6)])
      })
    });
  }

  onLogin() {
    console.log(this.loginForm);
    const email = this.loginForm.value.userData.email;
    const password = this.loginForm.value.userData.password;
    this.authService.loginUser(email, password);
  }

  openSnackBar() {
    this.snackBar.openFromComponent(LoginSnackbar, {
      duration: 2000,
    });
  }
}

@Component({
  selector: 'login-snackbar',
  templateUrl: 'login-snackbar.component.html',
})

export class LoginSnackbar { }
