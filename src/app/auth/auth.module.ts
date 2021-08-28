import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

import { RegisterComponent } from './register/register.component';
import { LoginComponent, LoginSnackbar } from './login/login.component';

@NgModule({
  declarations: [
    LoginComponent,
    LoginSnackbar,
    RegisterComponent
  ],
  imports: [
    SharedModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ],
  entryComponents: [LoginSnackbar]
})

export class AuthModule { }
