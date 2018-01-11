import {Component, OnInit} from '@angular/core';
import {HttpClientService} from '../../service/http-client.service';
import {ActivatedRoute, Router, Data} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {MainComponent} from '../../common/base/main-component';
import {FlashMessagesService} from '../../service/flash-messages.service';
import {Config} from '../../config/config';
import {ConfirmationService} from 'primeng/components/common/confirmationservice';
import {AppBackstageService} from '../../service/app-backstage.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent extends MainComponent implements OnInit {
  public params;   // 参数
  public dataUser; // 已投资用户数据接收
  public pagination; //  页码
  public form;     //  表单
  public userId: number; //  用户id
  public show: boolean;  //  添加投资产品弹框显示与隐藏
  public userName = '';  // 搜索的内容

  constructor(
    protected  http: HttpClientService,
    private  route: ActivatedRoute,
    private  router: Router,
    private flashMessages: FlashMessagesService,
    private confirmationService: ConfirmationService,
    private appBackstageService: AppBackstageService
  ) {
    super(http);
    this.pagination = this.pagination || {};
  }

  ngOnInit() {
    this.form = new FormGroup({userName: new FormControl('')});  // 根据用户名字来搜索
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
        this.FeedbackList();
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
        'page': e.page + 1
      },
      queryParamsHandling: 'merge'
    });
    // window.scroll(0, 0);
  }

  /**
   * 意见反馈列表
   */
  FeedbackList() {
    let obj = {'expand': 'userProfile,user' , 'real_name': this.userName};
    this.appBackstageService.FeedbackList(obj , this.params).subscribe(
      res => {
        this.dataUser = res['items'];
        this.pagination = res['_meta'];
      },
      error => {
        this.flashMessages.wechatprompt(error);
      }
    )
  }

  /**
   * 删除意见反馈
   * @param id
   */
  delete(id) {
    this.confirmationService.confirm({
      key: 'managerDel',
      icon: 'fa',
      // header: '温馨提示',
      message: '确定要删除该条意见反馈吗?',
      accept: () => {
        this.appBackstageService.deleteFeedback(id).subscribe(
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

  // 搜索框确定搜索重新加载页面
  onSubmit(form) {
    this.userName = form.userName.trim();
    this.router.navigate(['/appBackstage/feedback'], {
      queryParams: {
        page: this.userName === '' ? 1 : this.params['page'],
        real_name: this.userName ? this.userName.replace(/\s+/g, '') : null,
      }
    });
    this.load();
  }
}
