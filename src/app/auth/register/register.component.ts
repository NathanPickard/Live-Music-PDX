import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})

export class RegisterComponent {

  constructor() { }

  onRegister(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
  }
}