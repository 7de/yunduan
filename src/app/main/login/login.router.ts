import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserForgotComponent } from './user-forgot/user-forgot.component';
import { RegisterComponent } from './register/register.component';
import { AgreementComponent } from './agreement/agreement.component';

export const loginRoutes: Routes = [
  { path: '', redirectTo: 'user-login', pathMatch: 'full' },
  { path: 'user-login', component: UserLoginComponent },
  { path: 'user-forgot', component: UserForgotComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'agreement', component: AgreementComponent }
];

export const LoginRouting = RouterModule.forChild([
  { path: '', children: loginRoutes }
])
