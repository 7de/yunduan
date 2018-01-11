import {NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import {CommonModule} from '@angular/common';
import {HelpComponent} from './help.component';
import { LoginComponent } from './help-guide/login/login.component';
import { BuyerComponent } from './help-guide/buyer/buyer.component';
import { SellerComponent } from './help-guide/seller/seller.component';
import { RegisterComponent } from './help-guide/register/register.component';
import { SynopsisComponent } from './help-shop/synopsis/synopsis.component';
import { PayComponent } from './help-shop/pay/pay.component';
import { FaqComponent } from './help-shop/faq/faq.component';
import { ServiceAgreementComponent } from './help-shop/service-agreement/service-agreement.component';
import { ServiceSpecificationComponent } from './help-shop/service-specification/service-specification.component';
import { LawComponent } from './help-shop/law/law.component';
import { ClassroomSynopsisComponent } from './help-classroom/classroom-synopsis/classroom-synopsis.component';
import { VideoComponent } from './help-classroom/video/video.component';
import { PictureComponent } from './help-classroom/picture/picture.component';
import { UploadComponent } from './help-classroom/upload/upload.component';
import { PipeModule } from '#{pipe}/pipe.module';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    PipeModule
  ],
  declarations: [
    HelpComponent,
    LoginComponent,
    BuyerComponent,
    SellerComponent,
    RegisterComponent,
    SynopsisComponent,
    PayComponent,
    FaqComponent,
    ServiceAgreementComponent,
    ServiceSpecificationComponent,
    LawComponent,
    ClassroomSynopsisComponent,
    VideoComponent,
    PictureComponent,
    UploadComponent
  ]
})
export class HelpModule {
}
