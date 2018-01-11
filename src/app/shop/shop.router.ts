import { Routes, RouterModule } from '@angular/router';

import { ShopComponent } from './shop.component';
import { ApplicationServiceComponent } from './application-service/application-service.component';
// import { RealnameAuthComponent } from './realname-auth/realname-auth.component';
import { ShopIndexComponent } from './shop-index/shop-index.component';
import { SubmitApplyComponent } from './submit-apply/submit-apply.component';
import { WalletAccountComponent } from './wallet-account/wallet-account.component';
import { StepComponent } from './step/step.component';
import {ViewProtocolComponent} from './view-protocol/view-protocol.component';
// import { StepInfoComponent } from './step/step-info/step-info.component';

// PATH == /shop/*
export const ROUTES: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: ShopIndexComponent },
  { path: 'applicationservice', component: ApplicationServiceComponent },
  // { path: 'realnameauth', component: RealnameAuthComponent },
  { path: 'wallet', component: WalletAccountComponent },
  {
    path: 'step', children: [
      { path: '', redirectTo: 'step', pathMatch: 'full' },
      { path: 'step', component: StepComponent },
      // { path: 'step-info', component: StepInfoComponent }
    ]
  }
]
export const shopNotComponentRouters: Routes = [
  { path: 'submitapply', component: SubmitApplyComponent },
  { path:'view-protocol', component:ViewProtocolComponent}
]

export const ShopRouting = RouterModule.forChild([
  { path: '', component: ShopComponent, children: ROUTES },
  { path: '', children: shopNotComponentRouters }
])
