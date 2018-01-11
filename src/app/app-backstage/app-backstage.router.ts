import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { NoticeManageComponent } from './notice-manage/notice-manage.component';
import { FreshNoticeComponent } from './notice-manage/fresh-notice/fresh-notice.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { SeeFeedbackComponent } from './feedback/see-feedback/see-feedback.component';
import { TabSwitchComponent } from './tab-switch/tab-switch.component';

// PATH = ./appBackstage
export const appBackstageRoutes: Routes = [
  { path: '', redirectTo: 'companyInfo', pathMatch: 'full' },
  { path: 'companyInfo', component: CompanyInfoComponent },
  {
    path: 'noticeManage', children: [
      { path: '', component: NoticeManageComponent },
      { path: 'freshNotice', component: FreshNoticeComponent },
    ]
  },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'seeFeedback/:id', component: SeeFeedbackComponent }
];

export const appBackstageRouting = RouterModule.forChild([
  { path: '', component: TabSwitchComponent, children: appBackstageRoutes }
])

export const AppBackstageRouting = RouterModule.forChild([
  { path: '', component: TabSwitchComponent, children: appBackstageRoutes }
])
