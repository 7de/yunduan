import { RouterModule, Routes } from '@angular/router';
import {HelpComponent} from './help.component';
import {LoginComponent} from './help-guide/login/login.component';
import {BuyerComponent} from './help-guide/buyer/buyer.component';
import {SellerComponent} from './help-guide/seller/seller.component';
import {RegisterComponent} from './help-guide/register/register.component';
import {SynopsisComponent} from './help-shop/synopsis/synopsis.component';
import {PayComponent} from './help-shop/pay/pay.component';
import {FaqComponent} from './help-shop/faq/faq.component';
import {ServiceAgreementComponent} from './help-shop/service-agreement/service-agreement.component';
import {ServiceSpecificationComponent} from './help-shop/service-specification/service-specification.component';
import {LawComponent} from './help-shop/law/law.component';
import {ClassroomSynopsisComponent} from './help-classroom/classroom-synopsis/classroom-synopsis.component';
import {VideoComponent} from './help-classroom/video/video.component';
import {PictureComponent} from './help-classroom/picture/picture.component';
import {UploadComponent} from './help-classroom/upload/upload.component';

//  Path = /site/help
export const helpRoutes: Routes = [
  { path: '', component: HelpComponent,children:[
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path:'login',component:LoginComponent},
    { path:'buyer',component:BuyerComponent},
    { path:'seller',component:SellerComponent},
    { path:'register',component:RegisterComponent},

    { path:'synopsis',component:SynopsisComponent},
    { path:'pay',component:PayComponent},
    { path:'faq',component:FaqComponent},
    { path:'service-agreement',component:ServiceAgreementComponent},
    { path:'service-specification',component:ServiceSpecificationComponent},
    { path:'law',component:LawComponent},

    { path:'classroom-synopsis',component:ClassroomSynopsisComponent},
    { path:'video',component:VideoComponent},
    { path:'picture',component:PictureComponent},
    { path:'upload',component:UploadComponent}
  ]}
];
