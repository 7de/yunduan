import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { IndexDemandComponent } from './index/index-demand/index-demand.component';
import { InvestedUserComponent } from './users/invested-user/invested-user.component';
import { ViewedUserComponent } from './users/viewed-user/viewed-user.component';
import { BookedUserComponent } from './users/booked-user/booked-user.component';
import { InfoUserComponent } from './users/info-user/info-user.component';
import { HistoryInvestedComponent } from './users/history-invested/history-invested.component';
import { TrackingComponent } from './users/tracking/tracking.component';
import { RecordUserComponent } from './users/record-user/record-user.component';
import { ProductIndexComponent } from './product/product-index/product-index.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { ProductViewComponent } from './product/product-view/product-view.component';
import { ProductRecordComponent } from './product/product-record/product-record.component';
import { ProductImportComponent } from './product/product-import/product-import.component';
import { InboxIndexComponent } from './inbox/inbox-index/inbox-index.component';
import { InboxViewComponent } from './inbox/inbox-view/inbox-view.component';
import { ManagerComponent } from './manager/manager.component';
import { ManagerFoundationsComponent } from './manager/manager-foundations/manager-foundations.component';
import { SettingComponent } from './setting/setting.component';
import { AccountComponent } from './setting/account/account.component';
import { InformationComponent } from './setting/information/information.component';
import { AmendComponent } from './setting/amend/amend.component';
import { ReviewComponent } from './setting/review/review.component';
import { TemplateComponent } from './setting/template/template.component';
import { LayoutComponent } from './layout/layout.component';

// PATH = ./main
export const mainRoutes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  {
    path: 'index', children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      { path: 'index', component: IndexComponent },
      { path: 'demand', component: IndexDemandComponent }
    ]
  },
  {
    path: 'users', children: [
      { path: '', redirectTo: 'invested', pathMatch: 'full' },
      { path: 'invested', component: InvestedUserComponent },
      { path: 'viewed', component: ViewedUserComponent },
      { path: 'booked', component: BookedUserComponent },
      { path: 'info/:id', component: InfoUserComponent },
      { path: 'history/:id', component: HistoryInvestedComponent },
      { path: 'tracking/:id', component: TrackingComponent },
      { path: 'record', component: RecordUserComponent }
    ]
  },
  {
    path: 'product', children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      { path: 'index', component: ProductIndexComponent },
      { path: 'create', component: ProductCreateComponent },
      { path: 'view/:id', component: ProductViewComponent },
      { path: 'record/:id', component: ProductRecordComponent },
      { path: 'import/:id', component: ProductImportComponent },
      { path: 'import', component: ProductImportComponent }
    ]
  },
  {
    path: 'inbox', children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      { path: 'index', component: InboxIndexComponent },
      { path: 'view', component: InboxViewComponent },
    ]
  },
  {
    path: 'manager', children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      { path: 'index', component: ManagerComponent },
      { path: 'foundations', component: ManagerFoundationsComponent },
    ]
  },
  {
    path: 'setting', component: SettingComponent, children: [
      { path: '', redirectTo: 'account', pathMatch: 'full' },
      { path: 'account', component: AccountComponent },
      { path: 'information', component: InformationComponent },
      { path: 'amend', component: AmendComponent },
      { path: 'review', component: ReviewComponent },
      { path: 'template', component: TemplateComponent }
    ]
  },
  { path: '**', redirectTo: '/error' }
];

export const MainRouting = RouterModule.forChild([
  { path: '', component: LayoutComponent, children: mainRoutes }
])
