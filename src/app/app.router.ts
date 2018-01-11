import { RouterModule, Routes } from '@angular/router';

// seller
import { sellerRoutes } from './shop/seller/seller.router';


// 常量路由
const routes: Routes = [
  { path: '', redirectTo: 'site', pathMatch: 'full' },
  { path: 'appBackstage', loadChildren: './app-backstage/app-backstage.module#AppBackstageModule' },
  { path: 'buyer', loadChildren: './shop/buyer/buyer.module#BuyerModule' },
  { path: 'lives', loadChildren: './main/lives/lives.module#LivesModule' },
  { path: 'login', loadChildren: './main/login/login.module#LoginModule' },
  { path: 'main', loadChildren: './main/main.module#MainModule' },
  // { path: 'seller', loadChildren: './shop/seller/seller.module#SellerModule' },
  { path: 'seller', children: sellerRoutes },
  { path: 'shop', loadChildren: './shop/shop.module#ShopModule' },
  { path: 'site', loadChildren: './site/site.module#SiteModule' },
  { path: 'wechat', loadChildren: './wechat/wechat.module#WechatModule' },
];

export const AppRouting = RouterModule.forRoot(routes)
