import { RouterModule, Routes } from '@angular/router';
import { StoreOrderComponent } from './personal/store/store-order/store-order.component';
import { SellerPersonalLayoutComponent } from './personal/seller-personal-layout/seller-personal-layout.component';
import { SellerPersonalIndexComponent } from './personal/seller-personal-index/seller-personal-index.component';
import { SellerPersonalIndexsComponent } from './personal/seller-personal-index/seller-personal-indexs/seller-personal-indexs.component';
import { StoreOrderDetailComponent } from './personal/store/store-order/store-order-detail/store-order-detail.component';
import { StoreOrderOthComponent } from './personal/store/store-order/store-order-oth/store-order-oth.component';
import { StoreOrderEstimateComponent } from './personal/store/store-order/store-order-estimate/store-order-estimate.component';
import { StoreGoodsComponent } from './personal/store/store-goods/store-goods.component';
import { StoreEstimateComponent } from './personal/store/store-estimate/store-estimate.component';
import { SellerEstimateSelfComponent } from './personal/store/store-estimate/seller-estimate-self/seller-estimate-self.component';
import { SellerEstimateOtherComponent } from './personal/store/store-estimate/seller-estimate-other/seller-estimate-other.component';
import { StoreInvoiceComponent } from './personal/store/store-invoice/store-invoice.component';
import { InvoiceListComponent } from './personal/store/store-invoice/invoice-list/invoice-list.component';
import { InvoiceSettingComponent } from './personal/store/store-invoice/invoice-setting/invoice-setting.component';
import { IncreasedComponent } from './personal/store/store-goods/increased/increased.component';
import { InvoiceDetalisComponent } from './personal/store/store-invoice/invoice-detalis/invoice-detalis.component';
import { SellerPersonalMessageComponent } from './personal/seller-personal-message/seller-personal-message.component';
import { SellerSetComponent } from './personal/seller-set/seller-set.component';
import { SellerPersonalInfoComponent } from './personal/seller-set/seller-personal-info/seller-personal-info.component';
import { SellerPersonalInformationComponent } from './personal/seller-set/seller-personal-info/seller-personal-information/seller-personal-information.component';
import { SellerPersonalSetphotoComponent } from './personal/seller-set/seller-personal-info/seller-personal-setphoto/seller-personal-setphoto.component';
import { PasswordLoginModifyComponent } from './personal/seller-set/password-login-modify/password-login-modify.component';
import { SellerAccountComponent } from './personal/seller-set/seller-account/seller-account.component';
import { SellerWalletComponent } from './personal/seller-set/seller-account/seller-wallet/seller-wallet.component';
import { SellerPasswordModifyComponent } from './personal/seller-set/seller-account/seller-password-modify/seller-password-modify.component';
import { SellerPasswordResetComponent } from './personal/seller-set/seller-account/seller-password-reset/seller-password-reset.component';
import { SellerDetailComponent } from './personal/seller-set/seller-account/seller-detail/seller-detail.component';
import { SellerCashComponent } from './personal/seller-set/seller-account/seller-cash/seller-cash.component';
import { SellerCashSuccessComponent } from './personal/seller-set/seller-account/seller-cash-success/seller-cash-success.component';
import { VideoMaterialComponent } from '../../main/lives/my-lives/video-material/video-material.component';
import { GraphicMaterialComponent } from '../../main/lives/my-lives/graphic-material/graphic-material.component';
import { MySerialComponent } from '../../main/lives/my-lives/my-serial/my-serial.component';
import { UploadPicturesComponent } from '../../main/lives/my-lives/graphic-material/upload-pictures/upload-pictures.component';
import { UploadVideoComponent } from '../../main/lives/my-lives/video-material/upload-video/upload-video.component';
import {RealnameAuthComponent} from '../realname-auth/realname-auth.component';
import {StepInfoComponent} from '../step/step-info/step-info.component';
import {PersonalCourseMaterialsComponent} from '../buyer/personal/personal-set/personal-course-materials/personal-course-materials.component';
import {IsLoggedGuard} from '../../guard/is-logged.guard';


// 服务商
// PATH = /seller
export const sellerRoutes: Routes = [
  { path: '', redirectTo: 'personal', pathMatch: 'full' },
  { path: 'detail',
    component: SellerDetailComponent,
    canActivate: [IsLoggedGuard],
  },
  { path: 'cash',
    component: SellerCashComponent,
    canActivate: [IsLoggedGuard],
  },
  { path: 'cashSuc',
    component: SellerCashSuccessComponent,
    canActivate: [IsLoggedGuard],
  },
  // 个人中心
  {
    path: 'personal',
    component: SellerPersonalLayoutComponent,
    canActivate: [IsLoggedGuard],
    children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' },

      // 首页
      {
        path: 'index', component: SellerPersonalIndexComponent, children: [
          { path: '', redirectTo: 'indexs', pathMatch: 'full' },
          { path: 'indexs', component: SellerPersonalIndexsComponent },
          { path: 'video-material', component: VideoMaterialComponent },
          { path: 'graphic-material', component: GraphicMaterialComponent },
          { path: 'my-serial', component: MySerialComponent },
          { path: 'upload-pictures', component: UploadPicturesComponent },
          { path: 'upload-video', component: UploadVideoComponent },
          { path: 'goods', component: StoreGoodsComponent },
          { path: 'order', component: StoreOrderComponent },
          {
            path: 'estimate', component: StoreEstimateComponent, children: [
              { path: '', redirectTo: 'self', pathMatch: 'full' },
              { path: 'self', component: SellerEstimateSelfComponent },
              { path: 'other', component: SellerEstimateOtherComponent }
            ]
          },
          {
            path: 'invoice', component: StoreInvoiceComponent, children: [
              { path: '', redirectTo: 'list', pathMatch: 'full' },
              { path: 'list', component: InvoiceListComponent },
              { path: 'setting', component: InvoiceSettingComponent }
            ]
          },
        ]
      },

      // 设置
      {
        path: 'set', component: SellerSetComponent, children: [
          { path: '', redirectTo: 'info', pathMatch: 'full' },
          {
            path: 'info', component: SellerPersonalInfoComponent, children: [
              { path: '', redirectTo: 'information', pathMatch: 'full' },
              { path: 'information', component: SellerPersonalInformationComponent },
              { path: 'photo', component: SellerPersonalSetphotoComponent }
            ]
          },
          { path: 'login-modify', component: PasswordLoginModifyComponent },
          {
            path: 'account', component: SellerAccountComponent, children: [
              { path: '', redirectTo: 'wallet', pathMatch: 'full' },
              { path: 'wallet', component: SellerWalletComponent },
              { path: 'modify', component: SellerPasswordModifyComponent },
              { path: 'reset', component: SellerPasswordResetComponent },
            ]
          },
          { path: 'realnameauth', component: RealnameAuthComponent },
          { path: 'storeset', component: StepInfoComponent },
          { path: 'course-materials', component: PersonalCourseMaterialsComponent }
        ]
      },

      // 消息中心
      { path: 'message',
        component: SellerPersonalMessageComponent,
        canActivate: [IsLoggedGuard],
      },

      // 订单相关
      { path: 'order/:id',
        component: StoreOrderDetailComponent,
        canActivate: [IsLoggedGuard],
      },
      { path: 'order-oth/:id',
        component: StoreOrderOthComponent,
        canActivate: [IsLoggedGuard],
      },
      { path: 'order-estimate',
        component: StoreOrderEstimateComponent,
        canActivate: [IsLoggedGuard],
      },

      // 服务相关
      { path: 'increased',
        component: IncreasedComponent,
        canActivate: [IsLoggedGuard],
      }
    ]
  },
  { path: 'personal',
    canActivate: [IsLoggedGuard],
    children: [
    // 发票详情
    { path: 'invoiceDetalis', component: InvoiceDetalisComponent }
  ]}
]

export const SellerRouting = RouterModule.forChild([
  { path: '', children: sellerRoutes }
])
