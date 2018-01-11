import { RouterModule, Routes } from '@angular/router';

import { BuyerComponent } from './buyer.component'
import { PersonalLayoutComponent } from './personal/personal-layout/personal-layout.component'
import { AccountDetailComponent } from './personal/personal-set/personal-account/account-detail/account-detail.component'
import { AccountCashComponent } from './personal/personal-set/personal-account/account-cash/account-cash.component'
import { AccountPayComponent } from './personal/personal-set/personal-account/account-pay/account-pay.component';
import { CashSuccessComponent } from './personal/personal-set/personal-account/cash-success/cash-success.component';
import { StoreComponent } from './facilitator/store/store.component';
import { ItemComponent } from './facilitator/item/item.component';
import { PayComponent } from './facilitator/pay/pay.component';
import { BuyComponent } from './facilitator/buy/buy.component';
import { PersonalHomeComponent } from './personal/personal-home/personal-home.component';
import { PersonalIndexComponent } from './personal/personal-index/personal-index.component';
import { PersonalIndexsComponent } from './personal/personal-index/personal-indexs/personal-indexs.component';
import { PersonalEstimateComponent } from './personal/personal-estimate/personal-estimate.component';
import { EstimateBuyerComponent } from './personal/personal-estimate/estimate-buyer/estimate-buyer.component'
import { EstimateSellerComponent } from './personal/personal-estimate/estimate-seller/estimate-seller.component';
import { PersonalOrderComponent } from './personal/personal-order/personal-order.component';
import { PersonalSetComponent } from './personal/personal-set/personal-set.component';
import { PersonalMessageComponent } from './personal/personal-message/personal-message.component';
import { PersonalOrderDetailComponent } from './personal/personal-order/personal-order-detail/personal-order-detail.component';
import { PersonalOrderInvoiceComponent } from './personal/personal-order/personal-order-invoice/personal-order-invoice.component';
import { PersonalOrderEstimateComponent } from './personal/personal-order/personal-order-estimate/personal-order-estimate.component';

import { personalSetRoutes } from './personal/personal-set/personal-set.router';
import {UploadVideoComponent} from '../../main/lives/my-lives/video-material/upload-video/upload-video.component';
import {UploadPicturesComponent} from '../../main/lives/my-lives/graphic-material/upload-pictures/upload-pictures.component';
import {MySerialComponent} from '../../main/lives/my-lives/my-serial/my-serial.component';
import {GraphicMaterialComponent} from '../../main/lives/my-lives/graphic-material/graphic-material.component';
import {VideoMaterialComponent} from '../../main/lives/my-lives/video-material/video-material.component';
import {IsLoggedGuard} from '../../guard/is-logged.guard';


/**
 * @Path: buyer/personal
 */
const buyerPersonalRoutes: Routes = [
  {
    path: '',
    component: PersonalHomeComponent,
    canActivate: [IsLoggedGuard],
    children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      {
        path: 'index', component: PersonalIndexComponent, children: [
        { path: '', redirectTo: 'indexs', pathMatch: 'full' },
        { path: 'indexs', component: PersonalIndexsComponent },
        { path: 'video-material', component: VideoMaterialComponent },
        { path: 'graphic-material', component: GraphicMaterialComponent },
        { path: 'my-serial', component: MySerialComponent },
        { path: 'upload-pictures', component: UploadPicturesComponent },
        { path: 'upload-video', component: UploadVideoComponent },
          {
            path: 'estimate', component: PersonalEstimateComponent, children: [
              { path: '', redirectTo: 'self', pathMatch: 'full' },
              { path: 'self', component: EstimateBuyerComponent },
              { path: 'other', component: EstimateSellerComponent }
            ]
          },
          { path: 'order', component: PersonalOrderComponent }
        ]
      },
      { path: 'set', component: PersonalSetComponent, children: personalSetRoutes },
      { path: 'message',
        component: PersonalMessageComponent,
        canActivate: [IsLoggedGuard],
      }
    ]
  },
  { path: 'order/:id', component: PersonalOrderDetailComponent },
  { path: 'order-invoice/:id', component: PersonalOrderInvoiceComponent },
  { path: 'order-estimate/:id', component: PersonalOrderEstimateComponent }
];

// PATH = /buyer/facilitator
const buyerFacilitatorRoutes: Routes = [
  { path: '', redirectTo: 'store', pathMatch: 'full' },
  { path: 'store', component: StoreComponent },
  { path: 'goods', component: ItemComponent },
  { path: 'pay', component: PayComponent },
  { path: 'submission', component: BuyComponent }
]

// 基金公司
export const ROUTES: Routes = [
  { path: '', redirectTo: 'personal', pathMatch: 'full' },
  { path: 'personal',
    component: PersonalLayoutComponent,
    canActivate: [IsLoggedGuard],
    children: buyerPersonalRoutes },
  { path: 'detail',
    component: AccountDetailComponent,
    canActivate: [IsLoggedGuard],
  },
  { path: 'cash',
    component: AccountCashComponent,
    canActivate: [IsLoggedGuard],
  },
  { path: 'pay',
    component: AccountPayComponent,
    canActivate: [IsLoggedGuard],
  },
  { path: 'cashSuc',
    component: CashSuccessComponent,
    canActivate: [IsLoggedGuard],
  },
  { path: 'facilitator',
    children: buyerFacilitatorRoutes }
];

export const BuyerRouting = RouterModule.forChild([
  { path: '', component: BuyerComponent, children: ROUTES }
])
