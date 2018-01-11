import { NgModule } from '@angular/core';

import { LoaderService } from './loader.service';
import { HttpClientService } from './http-client.service';
import { CompanyService } from './company.service';
import { FlashMessagesService } from './flash-messages.service';
import { LocalStorageService } from './local-storage.service';
import { SessionStorageService } from './session-storage.service';
import { GetAssociatedProductService } from './get-associated-product.service';
import { GetEmailService } from './get-email.service';
import { OrderUsersService } from './order-users.service';
import { ProductService } from './product.service';
import { UsersService } from './users.service';
import { ManagerService } from './manager.service';
import { WechatService } from './wechat.service';
import { GetAuthorizationService } from './get-authorization.service';
import { OrderService } from './order.service';
import { EstimateService } from './estimate.service';
import { ShopService } from './shop.service';
import { ShopShowService } from './shop-show.service';
import { CityService } from './city.service';
import { BusinessService } from './business.service';
import { FundCompanyService } from './fund-company.service';
import { GoodsService } from './goods.service';
import { FacilitatorService } from './facilitator.service';
import { PayService } from './pay.service';
import { AppBackstageService } from './app-backstage.service';
import { MailService } from './mail.service';
import { SiteService } from './site.service';
import { PictureService } from './lives/picture.service';
import { VideoService } from './lives/video.service';

@NgModule({
  providers: [
    LoaderService,
    HttpClientService,
    CompanyService,
    FlashMessagesService,
    LocalStorageService,
    SessionStorageService,
    GetAssociatedProductService,
    GetEmailService,
    OrderUsersService,
    ProductService,
    UsersService,
    ManagerService,
    WechatService,
    GetAuthorizationService,
    OrderService,
    EstimateService,
    ShopService,
    ShopShowService,
    CityService,
    BusinessService,
    FundCompanyService,
    GoodsService,
    FacilitatorService,
    PayService,
    AppBackstageService,
    MailService,
    SiteService,
    PictureService,
    VideoService
  ]
})

export class ServiceModule { }
