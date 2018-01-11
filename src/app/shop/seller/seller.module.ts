import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { CUSTOM_ERRORS } from '#{config}/custom-errors';
import { ComponentModule } from '#{component}/component.module';
import {
  CalendarModule, CheckboxModule, DataTableModule, DialogModule, EditorModule, PaginatorModule, RadioButtonModule,
  RatingModule,
} from 'primeng/primeng';
import { PipeModule } from '#{pipe}/pipe.module';
import { StoreOrderComponent } from './personal/store/store-order/store-order.component';
import { StoreOrderDetailComponent } from './personal/store/store-order/store-order-detail/store-order-detail.component';
import { StoreOrderEstimateComponent } from './personal/store/store-order/store-order-estimate/store-order-estimate.component';
import { StoreOrderOthComponent } from './personal/store/store-order/store-order-oth/store-order-oth.component';
import { StoreGoodsComponent } from './personal/store/store-goods/store-goods.component';
import { IncreasedComponent } from './personal/store/store-goods/increased/increased.component';
import { StoreEstimateComponent } from './personal/store/store-estimate/store-estimate.component';
import { SellerEstimateSelfComponent } from './personal/store/store-estimate/seller-estimate-self/seller-estimate-self.component';
import { SellerEstimateOtherComponent } from './personal/store/store-estimate/seller-estimate-other/seller-estimate-other.component';
import { StoreInvoiceComponent } from './personal/store/store-invoice/store-invoice.component';
import { InvoiceDetalisComponent } from './personal/store/store-invoice/invoice-detalis/invoice-detalis.component';
import { InvoiceListComponent } from './personal/store/store-invoice/invoice-list/invoice-list.component';
import { InvoiceSettingComponent } from './personal/store/store-invoice/invoice-setting/invoice-setting.component';
import { SellerPersonalMessageComponent } from './personal/seller-personal-message/seller-personal-message.component';
import { SellerSetComponent } from './personal/seller-set/seller-set.component';
import { SellerPersonalInfoComponent } from './personal/seller-set/seller-personal-info/seller-personal-info.component';
import { SellerPersonalInformationComponent } from './personal/seller-set/seller-personal-info/seller-personal-information/seller-personal-information.component';
import { SellerPersonalSetphotoComponent } from './personal/seller-set/seller-personal-info/seller-personal-setphoto/seller-personal-setphoto.component';
import { PasswordLoginModifyComponent } from './personal/seller-set/password-login-modify/password-login-modify.component';
import { SellerAccountComponent } from './personal/seller-set/seller-account/seller-account.component';
import { SellerPasswordModifyComponent } from './personal/seller-set/seller-account/seller-password-modify/seller-password-modify.component';
import { SellerPasswordResetComponent } from './personal/seller-set/seller-account/seller-password-reset/seller-password-reset.component';
import { SellerDetailComponent } from './personal/seller-set/seller-account/seller-detail/seller-detail.component';
import { SellerPersonalLayoutComponent } from './personal/seller-personal-layout/seller-personal-layout.component';
import { SellerCashComponent } from './personal/seller-set/seller-account/seller-cash/seller-cash.component';
import { SellerCashSuccessComponent } from './personal/seller-set/seller-account/seller-cash-success/seller-cash-success.component';
import { SellerPersonalHomeComponent } from './personal/seller-personal-home/seller-personal-home.component';
import { PersonalModule } from './personal/personal.module';
import { UMeditorModule } from 'ngx-umeditor';
import { MyLivesModule } from "../../main/lives/my-lives/my-lives.module";
import { RouterModule } from '@angular/router';
import {RealnameAuthComponent} from '../realname-auth/realname-auth.component';
import {StepInfoComponent} from '../step/step-info/step-info.component';
import {PersonalSetModule} from '../buyer/personal/personal-set/personal-set.module';
import {SellerWalletComponent} from './personal/seller-set/seller-account/seller-wallet/seller-wallet.component';
// import { SellerRouting } from './seller.router';

@NgModule({
  imports: [
    CommonModule,
    ComponentModule,
    DataTableModule,
    PaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    // NgBootstrapFormValidationModule.forRoot(CUSTOM_ERRORS),
    DialogModule,
    CalendarModule,
    EditorModule,
    RatingModule,
    RadioButtonModule,
    PersonalModule,
    PipeModule,
    UMeditorModule,
    MyLivesModule,
    CheckboxModule,
    PersonalSetModule,
    RouterModule // SellerRouting
  ],
  declarations: [
    StoreOrderComponent,
    StoreOrderOthComponent,
    StoreOrderDetailComponent,
    StoreOrderEstimateComponent,
    StoreGoodsComponent,
    IncreasedComponent,
    StoreEstimateComponent,
    SellerEstimateSelfComponent,
    SellerEstimateOtherComponent,
    StoreInvoiceComponent,
    InvoiceDetalisComponent,
    InvoiceListComponent,
    InvoiceSettingComponent,
    SellerPersonalMessageComponent,
    SellerSetComponent,
    SellerPersonalInfoComponent,
    SellerPersonalInformationComponent,
    SellerPersonalSetphotoComponent,
    PasswordLoginModifyComponent,
    SellerAccountComponent,
    SellerPasswordModifyComponent,
    SellerPasswordResetComponent,
    SellerDetailComponent,
    SellerPersonalLayoutComponent,
    SellerCashComponent,
    SellerCashSuccessComponent,
    SellerPersonalHomeComponent,
    RealnameAuthComponent,
    StepInfoComponent,
    SellerWalletComponent
  ],
  exports: [
  ]
})
export class SellerModule { }
