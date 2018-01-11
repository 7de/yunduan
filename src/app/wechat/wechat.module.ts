import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentModule } from '#{component}/component.module';
import { PipeModule } from '#{pipe}/pipe.module';
import { wechatRouting } from './wechat.router';

import { WechatComponent } from './wechat.component';
import { WechatIndexComponent } from './wechat-index/wechat-index.component';
import { WechatSetEmpowerComponent } from './wechat-set/wechat-set-empower/wechat-set-empower.component';
import { WechatSetInfoComponent } from './wechat-set/wechat-set-info/wechat-set-info.component';
import { WechatActionMenuComponent } from './wechat-action/wechat-action-menu/wechat-action-menu.component';
import { WechatManageUsersComponent } from './wechat-manage/wechat-manage-users/wechat-manage-users.component';
import { AttentionReplyComponent } from './wechat-action/wechat-action-reply/attention-reply/attention-reply.component';
import { AutoReplyComponent } from './wechat-action/wechat-action-reply/auto-reply/auto-reply.component';
import { KeywordReplyComponent } from './wechat-action/wechat-action-reply/keyword-reply/keyword-reply.component';
import { KeywordCreatComponent } from './wechat-action/wechat-action-reply/keyword-reply/keyword-creat/keyword-creat.component';
import { ReplyIndexComponent } from './wechat-action/wechat-action-reply/reply-index/reply-index.component';
import { NewsDetailComponent } from './wechat-manage/news-detail/news-detail.component';
import { PaginatorModule, ChipsModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentModule,
    PipeModule,
    PaginatorModule,
    ChipsModule,
    wechatRouting
  ],
  declarations: [
    WechatComponent,
    WechatIndexComponent,
    WechatSetEmpowerComponent,
    WechatSetInfoComponent,
    WechatActionMenuComponent,
    WechatManageUsersComponent,
    AttentionReplyComponent,
    AutoReplyComponent,
    KeywordReplyComponent,
    KeywordCreatComponent,
    ReplyIndexComponent,
    NewsDetailComponent
  ]
})

export class WechatModule { }
