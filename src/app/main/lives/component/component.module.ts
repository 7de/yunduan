import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { CUSTOM_ERRORS } from '#{config}/custom-errors';
import { DialogModule, PaginatorModule } from 'primeng/primeng';
import { PicturesCommentsComponent } from './pictures-comments/pictures-comments.component';
import { PipeModule } from '#{pipe}/pipe.module';
import {ComponentModule} from "#{component}/component.module";
@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    DialogModule,
    PaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    // NgBootstrapFormValidationModule.forRoot(CUSTOM_ERRORS),
    PipeModule,
    ComponentModule
  ],
  declarations: [PicturesCommentsComponent],
  exports: [PicturesCommentsComponent]
})
export class LivesComponentModule { }
