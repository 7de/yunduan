import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AccountCashComponent } from './personal/personal-set/personal-account/account-cash/account-cash.component';
import { AccountDetailComponent } from './personal/personal-set/personal-account/account-detail/account-detail.component';
import { AccountPayComponent } from './personal/personal-set/personal-account/account-pay/account-pay.component';
import { BuyComponent } from './facilitator/buy/buy.component';
import { BuyerComponent } from './buyer.component';
import { BuyerRouting } from './buyer.router';
import {
  CalendarModule,
  DataTableModule,
  DialogModule,
  EditorModule,
  PaginatorModule,
  RadioButtonModule,
  RatingModule
} from 'primeng/primeng';
import { CashSuccessComponent } from './personal/personal-set/personal-account/cash-success/cash-success.component';
import { EstimateBuyerComponent } from './personal/personal-estimate/estimate-buyer/estimate-buyer.component';
import { EstimateSellerComponent } from './personal/personal-estimate/estimate-seller/estimate-seller.component';
import { ItemComponent } from './facilitator/item/item.component';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { PayComponent } from './facilitator/pay/pay.component';
import { PersonalEstimateComponent } from './personal/personal-estimate/personal-estimate.component';
import { PersonalHomeComponent } from './personal/personal-home/personal-home.component';
import { PersonalLayoutComponent } from './personal/personal-layout/personal-layout.component';
import { PersonalMessageComponent } from './personal/personal-message/personal-message.component';
import { PersonalModule } from './personal/personal.module';
import { PersonalOrderComponent } from './personal/personal-order/personal-order.component';
import { PersonalOrderDetailComponent } from './personal/personal-order/personal-order-detail/personal-order-detail.component';
import { PersonalOrderEstimateComponent } from './personal/personal-order/personal-order-estimate/personal-order-estimate.component';
import { PersonalOrderInvoiceComponent } from './personal/personal-order/personal-order-invoice/personal-order-invoice.component';
import { StoreComponent } from './facilitator/store/store.component';
import { ComponentModule } from '#{component}/component.module';
import { CUSTOM_ERRORS } from '#{config}/custom-errors';
import { PipeModule } from '#{pipe}/pipe.module';
import { GalleriaModule } from 'primeng/components/galleria/galleria';
import { CheckboxModule } from 'primeng/components/checkbox/checkbox';

@NgModule({
  imports: [
    PipeModule,
    CommonModule,
    ComponentModule,
    // NgBootstrapFormValidationModule.forRoot(CUSTOM_ERRORS),
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    PaginatorModule,
    DialogModule,
    CalendarModule,
    EditorModule,
    RatingModule,
    RadioButtonModule,
    PersonalModule,
    BuyerRouting,
    GalleriaModule,
    CheckboxModule
  ],
  declarations: [
    AccountDetailComponent,
    AccountCashComponent,
    AccountPayComponent,
    CashSuccessComponent,
    StoreComponent,
    ItemComponent,
    PayComponent,
    BuyComponent,
    BuyerComponent,
    PersonalLayoutComponent,
    PersonalHomeComponent,
    PersonalEstimateComponent,
    EstimateBuyerComponent,
    EstimateSellerComponent,
    PersonalOrderComponent,
    PersonalOrderDetailComponent,
    PersonalOrderInvoiceComponent,
    PersonalOrderEstimateComponent,
    PersonalMessageComponent,
  ]
})
export class BuyerModule { }
