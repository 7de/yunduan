import { RouterModule, Routes } from '@angular/router';
import { WechatIndexComponent } from './wechat-index/wechat-index.component';
import { WechatActionMenuComponent } from './wechat-action/wechat-action-menu/wechat-action-menu.component';
import { ReplyIndexComponent } from './wechat-action/wechat-action-reply/reply-index/reply-index.component';
import { AttentionReplyComponent } from './wechat-action/wechat-action-reply/attention-reply/attention-reply.component';
import { AutoReplyComponent } from './wechat-action/wechat-action-reply/auto-reply/auto-reply.component';
import { KeywordReplyComponent } from './wechat-action/wechat-action-reply/keyword-reply/keyword-reply.component';
import { KeywordCreatComponent } from './wechat-action/wechat-action-reply/keyword-reply/keyword-creat/keyword-creat.component';
import { WechatManageUsersComponent } from './wechat-manage/wechat-manage-users/wechat-manage-users.component';
import { NewsDetailComponent } from './wechat-manage/news-detail/news-detail.component';
import { WechatSetEmpowerComponent } from './wechat-set/wechat-set-empower/wechat-set-empower.component';
import { WechatSetInfoComponent } from './wechat-set/wechat-set-info/wechat-set-info.component';
import { WechatComponent } from './wechat.component';

export const wechatRoutes: Routes = [
  { path: '', redirectTo: 'wechat-index', pathMatch: 'full' },
  { path: 'wechat-index', component: WechatIndexComponent },
  {
    path: 'wechat-action', children: [
      { path: 'reply', redirectTo: 'reply', pathMatch: 'full' },
      { path: 'menu', component: WechatActionMenuComponent },
      {
        path: 'reply', children: [
          { path: '', redirectTo: 'reply-index', pathMatch: 'full' },
          {
            path: 'reply-index', component: ReplyIndexComponent, children: [
              { path: '', redirectTo: 'attention', pathMatch: 'full' },
              { path: 'attention', component: AttentionReplyComponent },
              { path: 'info', component: AutoReplyComponent },
              { path: 'keyword', component: KeywordReplyComponent },
            ]
          },
          { path: 'create/:id', component: KeywordCreatComponent }
        ]
      }
    ]
  },
  {
    path: 'wechat-manage', children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'users', component: WechatManageUsersComponent },
      { path: 'detail/:id', component: NewsDetailComponent }
    ]
  },
  {
    path: 'wechat-set', children: [
      { path: '', redirectTo: 'empower', pathMatch: 'full' },
      { path: 'empower', component: WechatSetEmpowerComponent },
      { path: 'info', component: WechatSetInfoComponent }
    ]
  }
];

export const wechatRouting = RouterModule.forChild([
  { path: '', component: WechatComponent, children: wechatRoutes }
])