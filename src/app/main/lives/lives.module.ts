import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentModule } from '#{component}/component.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { CUSTOM_ERRORS } from '#{config}/custom-errors';
import { SharedModule, PaginatorModule, DialogModule, CheckboxModule } from 'primeng/primeng';
import { PicturesIndexComponent } from './pictures/pictures-index/pictures-index.component';
import { PicturesDetailComponent } from './pictures/pictures-detail/pictures-detail.component';
import { PicturesSearchComponent } from './pictures/pictures-search/pictures-search.component';
import { PicturesListComponent } from './pictures/pictures-list/pictures-list.component';
import { VideosIndexComponent } from './videos/videos-index/videos-index.component';
import { VideosDetailsComponent } from './videos/videos-details/videos-details.component';
import { LivesIndexComponent } from './lives-index/lives-index.component';
import { LivesHomeComponent } from './lives-home/lives-home.component';
import { PipeModule } from '#{pipe}/pipe.module';
import { LivesRouting } from './lives.router';
import { PicturesVoiceComponent } from './pictures/pictures-voice/pictures-voice.component';

import { VgCoreModule } from "videogular2/core";
import { VgControlsModule } from "videogular2/controls";
import { VgOverlayPlayModule } from "videogular2/overlay-play";
import { VgBufferingModule } from "videogular2/buffering"; import { LivesSearchComponent } from './lives-search/lives-search.component';
import { PicturesComponent } from './pictures/pictures.component';

import { LivesComponentModule } from './component/component.module'
import {LivesListComponent} from './lives-list/lives-list.component';
import { VideosListComponent } from './videos/videos-list/videos-list.component';
import {GalleriaModule} from 'primeng/primeng';
import {UploadProtocolComponent} from './my-lives/upload-protocol/upload-protocol.component';
@NgModule({
  imports: [
    CommonModule,
    ComponentModule,
    LivesComponentModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PaginatorModule,
    DialogModule,
    CheckboxModule,
    // NgBootstrapFormValidationModule.forRoot(CUSTOM_ERRORS),
    PipeModule,
    LivesRouting,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    GalleriaModule
  ],
  declarations: [
    PicturesIndexComponent,
    PicturesDetailComponent,
    PicturesSearchComponent,
    PicturesListComponent,
    VideosIndexComponent,
    VideosDetailsComponent,
    LivesIndexComponent,
    LivesHomeComponent,
    PicturesVoiceComponent,
    PicturesComponent,
    LivesListComponent,
    LivesSearchComponent,
    VideosListComponent,
    UploadProtocolComponent]
})
export class LivesModule { }
