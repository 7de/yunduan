import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { CUSTOM_ERRORS } from '#{config}/custom-errors';
import { ComponentModule } from '#{component}/component.module';
import { PipeModule } from '#{pipe}/pipe.module';
import { DataTableModule, PaginatorModule, EditorModule } from 'primeng/primeng';
import { AppBackstageRouting } from 'app/app-backstage/app-backstage.router';

import { TabSwitchComponent } from './tab-switch/tab-switch.component';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { NoticeManageComponent } from './notice-manage/notice-manage.component';
import { FreshNoticeComponent } from './notice-manage/fresh-notice/fresh-notice.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { SeeFeedbackComponent } from './feedback/see-feedback/see-feedback.component';
import {UMeditorModule} from 'ngx-umeditor';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    // NgBootstrapFormValidationModule.forRoot(CUSTOM_ERRORS),
    ComponentModule,
    PipeModule,
    DataTableModule,
    PaginatorModule,
    EditorModule,
    AppBackstageRouting,
    UMeditorModule
  ],
  declarations: [
    TabSwitchComponent,
    CompanyInfoComponent,
    NoticeManageComponent,
    FreshNoticeComponent,
    FeedbackComponent,
    SeeFeedbackComponent
  ]
})

export class AppBackstageModule { }
