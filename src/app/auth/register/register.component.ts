import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})

export class RegisterComponent {

  constructor(private authService: AuthService) { }

  onRegister(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.registerUser(email, password);
  }
}