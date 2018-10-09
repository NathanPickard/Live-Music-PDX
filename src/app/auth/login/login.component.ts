import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent {

  constructor(private authService: AuthService) { }

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

  // onLogin(form: NgForm) {
  //   const email = form.value.email;
  //   const password = form.value.password;
  //   this.authService.loginUser(email, password);
  // }
}