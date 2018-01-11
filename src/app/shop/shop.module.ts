import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgBootstrapFormValidationModule} from 'ng-bootstrap-form-validation';
import {CUSTOM_ERRORS} from '#{config}/custom-errors';

import {ComponentModule} from '#{component}/component.module';
// import { SellerModule } from './seller/seller.module';
import {PipeModule} from '../pipe/pipe.module';
import {CalendarModule} from 'primeng/components/calendar/calendar';
import {DataTableModule, PaginatorModule} from 'primeng/primeng';
import {CheckboxModule} from 'primeng/components/checkbox/checkbox';
import {ShopComponent} from './shop.component';
import {ShopIndexComponent} from './shop-index/shop-index.component';
import {ApplicationServiceComponent} from './application-service/application-service.component';
import {SubmitApplyComponent} from './submit-apply/submit-apply.component';
import {WalletAccountComponent} from './wallet-account/wallet-account.component';
import {StepComponent} from './step/step.component';
import {ShopRouting} from './shop.router';
import { ViewProtocolComponent } from './view-protocol/view-protocol.component';
// import { RealnameAuthComponent } from './realname-auth/realname-auth.component';
// import { StepInfoComponent } from './step/step-info/step-info.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // NgBootstrapFormValidationModule.forRoot(CUSTOM_ERRORS),
    ComponentModule,
    // SellerModule,
    ShopRouting,
    CalendarModule,
    DataTableModule,
    PipeModule,
    PaginatorModule,
    CheckboxModule
  ],
  declarations: [
    ShopComponent,
    ShopIndexComponent,
    ApplicationServiceComponent,
    SubmitApplyComponent,
    WalletAccountComponent,
    StepComponent,
    ViewProtocolComponent,
    // RealnameAuthComponent,
    // StepInfoComponent
  ]
})

export class ShopModule { }
