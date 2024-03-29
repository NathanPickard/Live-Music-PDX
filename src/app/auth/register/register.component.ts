import { Component, OnInit } from '@angular/core';
import { NgForm, UntypedFormControl, Validators, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService,
    public snackBar: MatSnackBar) { }

  email = new UntypedFormControl('', [Validators.required, Validators.email]);
  registerForm: UntypedFormGroup;

  ngOnInit() {
    this.registerForm = new UntypedFormGroup({
      'userData': new UntypedFormGroup({
        'email': new UntypedFormControl(null, [Validators.required, Validators.email]),
        'password': new UntypedFormControl(null, [Validators.required, Validators.minLength(6)])
      })
    });
  }

  // onRegister(form: NgForm) {
  //   const email = form.value.email;
  //   const password = form.value.password;
  //   this.authService.registerUser(email, password);
  // }

  onRegister() {
    console.log(this.registerForm);
    const email = this.registerForm.value.userData.email;
    const password = this.registerForm.value.userData.password;
    this.authService.registerUser(email, password);
  }

  openSnackBar() {
    this.snackBar.openFromComponent(RegisterSnackbar, {
      duration: 2500
    });
  }

  // getErrorMessage() {
  //   return this.registerForm.hasError('required') ? 'You must enter a value' :
  //     this.registerForm.hasError('email') ? 'Not a valid email' : '';
  // }
}

@Component({
  selector: 'register-snackbar',
  templateUrl: 'register-snackbar.component.html',
})

export class RegisterSnackbar { }
