import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Config} from '../../config/config';
import {FlashMessagesService} from '../../service/flash-messages.service';
import {ConfirmationService} from 'primeng/components/common/confirmationservice';
import {AppBackstageService} from '../../service/app-backstage.service';
@Component({
  selector: 'app-notice-manage',
  templateUrl: './notice-manage.component.html',
  styleUrls: ['./notice-manage.component.scss']
})
export class NoticeManageComponent implements OnInit {
  public params;
  public data;
  public pagination;
  public form;
  public kind;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private flashMessages: FlashMessagesService,
    private confirmationService: ConfirmationService,
    private appBackstageService: AppBackstageService
  ) {
    this.pagination = this.pagination || {};
  }

  ngOnInit() {
    this.load();
  }

  // 加载页面
  load() {
    this.route.queryParams.subscribe(
      params => {
        this.params = Object.assign({
          page: params['page'],
          pageSize: Config.pageSize,
          grade: params['grade']
        });
        this.noticeList();
      }
    )
  }

  /**
   * 分页操作数据
   * @param e
   */
  paginate(e) {
    this.router.navigate([this.router.url.split('?')[0]], {
      queryParams: {
        page: e.page + 1,
      },
      queryParamsHandling: 'merge'
    });
  }

  /**
   * 获取公告列表
   */
  noticeList() {
    let obj = {'expand': 'category'};
    this.appBackstageService.noticeList(obj , this.params).subscribe(
      res => {
        this.data = res['items'];
        this.pagination = res['_meta'];
      },
      error => {
        this.flashMessages.wechatprompt(error);
      }
    )
  }

  /**
   * 删除温馨提醒
   */
  delete(id) {
    this.confirmationService.confirm({
      key: 'managerDel',
      icon: 'fa',
      message: '确定要删除该条公告吗？',
      accept: () => {
        this.appBackstageService.deleteNotice(id).subscribe(
          res => {
            this.load();
            this.flashMessages.wechatprompt('删除成功！');
          },
          error => {
            this.flashMessages.wechatprompt(error);
          }
        )
      }
    });
  }
}
