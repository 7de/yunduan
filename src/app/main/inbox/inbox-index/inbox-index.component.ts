import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Config } from '#{config}/config';
import { MainComponent } from '#{common}/base/main-component';
import { HttpClientService } from '#{service}/http-client.service';
import { GetEmailService } from '#{service}/get-email.service';
import { Message, ConfirmationService } from 'primeng/primeng';

const MULTI_URL = '/business-notice/delete-all'; // 批量删除站内信

@Component({
  selector: 'app-inbox-index',
  templateUrl: './inbox-index.component.html',
  styleUrls: ['./inbox-index.component.scss'],
  providers: [ConfirmationService]
})

export class InboxIndexComponent extends MainComponent implements OnInit {

  selectedEmails = []
  public emails: Array<any> = [] //  邮件列表

  public params = {
    pageSize: Config.pageSize,
    expand: 'poster',
    has_read: 0,
    page: 1
  } // 保存页面url参数
  public pagination
  public allCount
  public unreadCount
  public msgs: Message[] = [];

  constructor(
    protected http: HttpClientService,
    private route: ActivatedRoute,
    private router: Router,
    private getEmailService: GetEmailService,
    private confirmationService: ConfirmationService
  ) {
    super(http);
    this.pagination = this.pagination || {};
    this.allCount = this.allCount || 0;
    this.unreadCount = this.unreadCount || 0;
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.route.queryParams
      .subscribe(params => {
        Object.assign(this.params, { has_read: params['has_read'], page: params['page'] })
        this.index()
      });
  }

  /**
   * 获取邮件列表
   */
  index() {
    this.getEmailService.getEmail(this.params).subscribe(
      res => {
        this.emails = res['items']
        this.pagination = res['_meta']
        this.getAllCount()
        this.getUnreadCount()
      });
  }

  /**
   * 分页操作数据
   */
  paginate(e) {
    this.router.navigate([this.router.url.split('?')[0]], {
      queryParams: { page: e.page + 1 },
      queryParamsHandling: 'merge'
    });
  }

  /**
   * 阅读相关邮件
   * @param id
   */
  goView(email) {
    this.router.navigate(['/main/inbox/view'], { queryParams: { id: email.id, has_read: email.has_read } });
  }

  /**
   * 批量删除
   * @param params
   * @returns {Subscription}
   */
  deleteAll() {
    const id = this.selectedEmails.map(opt => opt.id);
    this.http.post(MULTI_URL, { id }).subscribe(
      next => {
        this.init(); // 刷新
        this.selectedEmails = [];
      },
      error => { }
    )
  }

  delete(id) {
    console.log(id)
    this.confirmationService.confirm({
      message: '确认删除此消息？',
      header: '系统提示',
      icon: 'fa fa-trash',
      accept: () => {
        this.getEmailService.delete(id).subscribe(
          next => {
            this.msgs = [{ severity: 'success', summary: '系统提示', detail: '删除成功' }]
            this.index()
          },
          error => this.msgs = [{ severity: 'warn', summary: '系统提示', detail: error }]
        )
      },
      reject: () => { }
    })
  }

  /**
   * 一共多少封
   * @param params
   * @returns {Subscription}
   */
  getAllCount() {
    return this.getEmailService.getCount()
      .subscribe(result => this.allCount = result)
  }

  /**
   * 未读数量
   * @param params
   * @returns {Subscription}
   */
  getUnreadCount() {
    return this.getEmailService.getCount({ has_read: 0 })
      .subscribe(result => this.unreadCount = result)
  }
}
