import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { CUSTOM_ERRORS } from '#{config}/custom-errors';
import { ComponentModule } from '#{component}/component.module';
import { LoginRouting } from 'app/main/login/login.router';

import { LoginComponent } from './login.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserForgotComponent } from './user-forgot/user-forgot.component';
import { RegisterComponent } from './register/register.component';
import { FileUploadModule, CalendarModule } from 'primeng/primeng';
import { AgreementComponent } from './agreement/agreement.component';
import { RegisterHeaderComponent } from './register-header/register-header.component';
import { RegisterSuccessComponent } from './register-success/register-success.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    // NgBootstrapFormValidationModule.forRoot(CUSTOM_ERRORS),
    ComponentModule,
    LoginRouting,
    FileUploadModule,
    CalendarModule
  ],
  declarations: [
    LoginComponent,
    UserLoginComponent,
    UserForgotComponent,
    RegisterComponent,
    AgreementComponent,
    RegisterHeaderComponent,
    RegisterSuccessComponent
  ],
  exports: [
    RegisterHeaderComponent,
    RegisterSuccessComponent
  ]
})

export class LoginModule { }
