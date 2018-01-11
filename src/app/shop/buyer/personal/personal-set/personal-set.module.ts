import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule, DataTableModule, DialogModule, EditorModule, PaginatorModule, RadioButtonModule, RatingModule } from 'primeng/primeng';
import { ComponentModule } from '#{component}/component.module';

import { PersonalQualificationComponent } from './personal-qualification/personal-qualification.component';
import { PersonalShopInformationComponent } from './personal-shop-information/personal-shop-information.component';
import { PersonalCourseMaterialsComponent } from './personal-course-materials/personal-course-materials.component';
import { PersonalInformationComponent } from './personal-info/personal-information/personal-information.component';
import { PersonalSetphotoComponent } from './personal-info/personal-setphoto/personal-setphoto.component';
import { PersonalAccountComponent } from './personal-account/personal-account.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { AccountWalletComponent } from './personal-account/account-wallet/account-wallet.component';
import { PasswordResetComponent } from './personal-account/password-reset/password-reset.component';
import { PasswordModifyComponent } from './personal-account/password-modify/password-modify.component';
import { PersonalSetComponent } from './personal-set.component';
import { PersonalLoginModifyComponent } from './personal-login-modify/personal-login-modify.component';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { CUSTOM_ERRORS } from '#{config}/custom-errors';
import {PipeModule} from '#{pipe}/pipe.module';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    DataTableModule,
    DialogModule,
    PipeModule,
    EditorModule,
    PaginatorModule,
    RadioButtonModule,
    RatingModule,
    ComponentModule,
    PipeModule,
    // NgBootstrapFormValidationModule.forRoot(CUSTOM_ERRORS)
  ],
  declarations: [
    PersonalQualificationComponent,
    PersonalShopInformationComponent,
    PersonalCourseMaterialsComponent,
    PersonalInformationComponent,
    PersonalSetphotoComponent,
    PersonalAccountComponent,
    PersonalInfoComponent,
    AccountWalletComponent,
    PasswordResetComponent,
    PasswordModifyComponent,
    PersonalSetComponent,
    PersonalLoginModifyComponent
  ],
  exports: [
    AccountWalletComponent
  ]
})

export class PersonalSetModule { }
