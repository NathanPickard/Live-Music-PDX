import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, Validators, FormGroup } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})

export class RegisterComponent {

  constructor(private authService: AuthService) { }

  email = new FormControl('', [Validators.required, Validators.email]);
  registerForm: FormGroup;

  ngOnInit() {
    this.registerForm = new FormGroup({
      'userData': new FormGroup({
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
      })
    })
  }

  onRegister(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.registerUser(email, password);
  }

  // getErrorMessage() {
  //   return this.registerForm.hasError('required') ? 'You must enter a value' :
  //     this.registerForm.hasError('email') ? 'Not a valid email' : '';
  // }
}