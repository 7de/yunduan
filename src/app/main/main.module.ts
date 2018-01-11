import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { CUSTOM_ERRORS } from '#{config}/custom-errors';
import { ComponentModule } from '#{component}/component.module';
import { PipeModule } from '#{pipe}/pipe.module';
import {
  CalendarModule,
  DataTableModule,
  PaginatorModule,
  ChartModule,
  TabViewModule,
  GrowlModule,
  PanelModule,
  ConfirmDialogModule
} from 'primeng/primeng';
import { QRCodeModule } from 'angular2-qrcode';
import { MainRouting } from './main.router';

import { InvestedUserComponent } from './users/invested-user/invested-user.component';
import { ViewedUserComponent } from './users/viewed-user/viewed-user.component';
import { BookedUserComponent } from './users/booked-user/booked-user.component';
import { SettingComponent } from './setting/setting.component';
import { ProductRecordComponent } from './product/product-record/product-record.component';
import { ProductImportComponent } from './product/product-import/product-import.component';
import { IndexComponent } from './index/index.component';
import { ProductIndexComponent } from './product/product-index/product-index.component';
import { LayoutComponent } from './layout/layout.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { ProductViewComponent } from './product/product-view/product-view.component';
import { InfoUserComponent } from './users/info-user/info-user.component';
import { HistoryInvestedComponent } from './users/history-invested/history-invested.component';
import { TrackingComponent } from './users/tracking/tracking.component';
import { AccountComponent } from './setting/account/account.component';
import { AmendComponent } from './setting/amend/amend.component';
import { ReviewComponent } from './setting/review/review.component';
import { TemplateComponent } from './setting/template/template.component';
import { IndexBombboxComponent } from './index/index-bombbox/index-bombbox.component';
import { RecordUserComponent } from './users/record-user/record-user.component';
import { InboxIndexComponent } from './inbox/inbox-index/inbox-index.component';
import { InboxViewComponent } from './inbox/inbox-view/inbox-view.component';
import { CreateInvestComponent } from './users/create-invest/create-invest.component';
import { CheckProductComponent } from './users/check-product/check-product.component'
import { IndexDemandComponent } from './index/index-demand/index-demand.component';
import { ManagerComponent } from './manager/manager.component';
import { ManagerFoundationsComponent } from './manager/manager-foundations/manager-foundations.component';
import { InformationComponent } from './setting/information/information.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // NgBootstrapFormValidationModule.forRoot(CUSTOM_ERRORS),
    ComponentModule,
    PipeModule,
    CalendarModule,
    DataTableModule,
    PaginatorModule,
    ChartModule,
    TabViewModule,
    GrowlModule,
    PanelModule,
    ConfirmDialogModule,
    QRCodeModule,
    MainRouting
  ],
  declarations: [
    LayoutComponent,
    InvestedUserComponent,
    ViewedUserComponent,
    BookedUserComponent,
    RecordUserComponent,
    SettingComponent,
    ProductRecordComponent,
    ProductImportComponent,
    IndexComponent,
    ProductIndexComponent,
    ProductCreateComponent,
    ProductViewComponent,
    InfoUserComponent,
    HistoryInvestedComponent,
    TrackingComponent,
    AccountComponent,
    AmendComponent,
    ReviewComponent,
    TemplateComponent,
    InboxIndexComponent,
    InboxViewComponent,
    IndexBombboxComponent,
    CreateInvestComponent,
    CheckProductComponent,
    IndexDemandComponent,
    ManagerComponent,
    ManagerFoundationsComponent,
    InformationComponent,
    AccountComponent
  ]
})

export class MainModule { }
