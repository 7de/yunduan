import { Routes } from '@angular/router';

import { PersonalQualificationComponent } from './personal-qualification/personal-qualification.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { PersonalInformationComponent } from './personal-info/personal-information/personal-information.component';
import { PersonalSetphotoComponent } from './personal-info/personal-setphoto/personal-setphoto.component';
import { PersonalLoginModifyComponent } from './personal-login-modify/personal-login-modify.component';
import { PersonalAccountComponent } from './personal-account/personal-account.component';
import { AccountWalletComponent } from './personal-account/account-wallet/account-wallet.component';
import { PasswordModifyComponent } from './personal-account/password-modify/password-modify.component';
import { PasswordResetComponent } from './personal-account/password-reset/password-reset.component';
import { PersonalShopInformationComponent } from './personal-shop-information/personal-shop-information.component';
import { PersonalCourseMaterialsComponent } from './personal-course-materials/personal-course-materials.component';

// PATH == /buyer/personal/set/*
export const personalSetRoutes: Routes = [
  { path: '', redirectTo: 'info', pathMatch: 'full' },
  {
    path: 'info', component: PersonalInfoComponent, children: [
      { path: '', redirectTo: 'information', pathMatch: 'full' },
      { path: 'information', component: PersonalInformationComponent },
      { path: 'photo', component: PersonalSetphotoComponent }
    ]
  },
  { path: 'qualification', component: PersonalQualificationComponent },
  { path: 'shop-information', component: PersonalShopInformationComponent },
  { path: 'course-materials', component: PersonalCourseMaterialsComponent },
  { path: 'login-modify', component: PersonalLoginModifyComponent },
  {
    path: 'account', component: PersonalAccountComponent, children: [
      { path: '', redirectTo: 'wallet', pathMatch: 'full' },
      { path: 'wallet', component: AccountWalletComponent },
      { path: 'modify', component: PasswordModifyComponent },
      { path: 'reset', component: PasswordResetComponent },
    ]
  },
]