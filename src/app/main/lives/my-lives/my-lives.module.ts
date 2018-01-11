import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { CUSTOM_ERRORS } from '#{config}/custom-errors';
import {
  CalendarModule,
  CheckboxModule,
  DataTableModule,
  DialogModule,
  EditorModule,
  PaginatorModule,
  RadioButtonModule,
  RatingModule,
  DropdownModule
} from 'primeng/primeng';
import { ComponentModule } from '#{component}/component.module';

import { GraphicMaterialComponent } from './graphic-material/graphic-material.component';
import { UploadPicturesComponent } from './graphic-material/upload-pictures/upload-pictures.component';
import { MySerialComponent } from './my-serial/my-serial.component';
import { VideoMaterialComponent } from './video-material/video-material.component';
import { UploadVideoComponent } from './video-material/upload-video/upload-video.component';
import { PipeModule } from '#{pipe}/pipe.module';
import { UMeditorModule } from 'ngx-umeditor';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    // NgBootstrapFormValidationModule.forRoot(CUSTOM_ERRORS),
    CalendarModule,
    DataTableModule,
    DialogModule,
    EditorModule,
    PaginatorModule,
    RadioButtonModule,
    RatingModule,
    ComponentModule,
    PipeModule,
    CheckboxModule,
    UMeditorModule,
    DropdownModule
  ],
  declarations: [
    GraphicMaterialComponent,
    UploadPicturesComponent,
    MySerialComponent,
    VideoMaterialComponent,
    UploadVideoComponent,
  ]
})

export class MyLivesModule {
}
