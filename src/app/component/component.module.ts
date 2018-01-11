import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UrlTabComponent } from './url-tab/url-tab.component';
import { VideoUploadComponent } from './video-upload/video-upload.component';
import { BasicImgUploadComponent } from './basic-img-upload/basic-img-upload.component';
import { EditorComponent } from './editor/editor.component';
import { StringLengthComponent } from './string-length/string-length.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { HeadsComponent } from './heads/heads.component';
import { HeadsSingleComponent } from './heads-single/heads-single.component';
import { HeadsShopComponent } from './heads-shop/heads-shop.component';
import { LivesSearchHeaderComponent } from './lives-search-header/lives-search-header.component';
import { FileUploadModule } from 'primeng/components/fileupload/fileupload';
import { EditorModule } from 'primeng/components/editor/editor';
import { PlayerComponent } from './player/player.component';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
import { LivesImgUploadComponent } from './lives-img-upload/lives-img-upload.component';
import { GoodsComponent } from './goods/goods.component';
import { FooterComponent } from './footer/footer.component';
import { CountdownComponent } from './countdown/countdown.component';
import { HeadHomeComponent } from './head-home/head-home.component';
import { BusinessUploadComponent } from './business-upload/business-upload.component';
import { CitySelectComponent } from './city-select/city-select.component';
import { ImgUploadComponent } from './img-upload/img-upload.component';
import { ModelComponent } from './model/model.component';
import { HeadWalletComponent } from './head-wallet/head-wallet.component';
import { LoaderComponent } from './loader/loader.component';
import { PipeModule } from '#{pipe}/pipe.module';
import { AudioPlayerComponent } from './audio-player/audio-player.component';
import { DialogModule, DropdownModule } from 'primeng/primeng';
import { BackToTopComponent } from './back-to-top/back-to-top.component';
import { WalletComponent } from './wallet/wallet.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { CreateSerialFormComponent } from './create-serial-form/create-serial-form.component';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { CUSTOM_ERRORS } from '#{config}/custom-errors';

@NgModule({
  imports: [
    // NgBootstrapFormValidationModule.forRoot(CUSTOM_ERRORS),
    CommonModule,
    RouterModule,
    FileUploadModule,
    EditorModule,
    FormsModule,
    ReactiveFormsModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    PipeModule,
    DialogModule,
    DropdownModule
  ],
  declarations: [
    UrlTabComponent,
    VideoUploadComponent,
    BasicImgUploadComponent,
    EditorComponent,
    StringLengthComponent,
    MainHeaderComponent,
    HeadsComponent,
    HeadsSingleComponent,
    HeadsShopComponent,
    LivesSearchHeaderComponent,
    PlayerComponent,
    LivesImgUploadComponent,
    GoodsComponent,
    HeadHomeComponent,
    CountdownComponent,
    BusinessUploadComponent,
    FooterComponent,
    CitySelectComponent,
    ImgUploadComponent,
    ModelComponent,
    HeadWalletComponent,
    LoaderComponent,
    AudioPlayerComponent,
    BackToTopComponent,
    WalletComponent,
    LoginModalComponent,
    CreateSerialFormComponent
  ],
  exports: [
    UrlTabComponent,
    VideoUploadComponent,
    BasicImgUploadComponent,
    EditorComponent,
    StringLengthComponent,
    MainHeaderComponent,
    HeadsComponent,
    HeadsSingleComponent,
    HeadsShopComponent,
    LivesSearchHeaderComponent,
    PlayerComponent,
    LivesImgUploadComponent,
    GoodsComponent,
    HeadHomeComponent,
    CountdownComponent,
    BusinessUploadComponent,
    FooterComponent,
    CitySelectComponent,
    ImgUploadComponent,
    ModelComponent,
    HeadWalletComponent,
    LoaderComponent,
    AudioPlayerComponent,
    BackToTopComponent,
    WalletComponent,
    LoginModalComponent,
    CreateSerialFormComponent
  ],
  providers: [
    // HeadsSingleService
  ]
})
export class ComponentModule {
}
