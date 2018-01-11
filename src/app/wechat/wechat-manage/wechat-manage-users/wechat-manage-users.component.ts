import {Component, OnInit} from '@angular/core';
import {HttpClientService} from '../../../service/http-client.service';
import {ActivatedRoute, Router} from '@angular/router';
import {WechatComponent} from '../../../common/base/wechat-component';
import {FormControl, FormGroup} from '@angular/forms';
import {FlashMessagesService} from '../../../service/flash-messages.service';
import {DatetimeHelper} from '../../../common/helper/datetime-helper';

@Component({
  selector: 'app-wechat-manage-users',
  templateUrl: './wechat-manage-users.component.html',
  styleUrls: ['./wechat-manage-users.component.scss']
})
export class WechatManageUsersComponent extends WechatComponent implements OnInit {


  public dataFans; // 粉丝列表
  public pagination; // 页码
  public params;
  public fansUrl = '/fans-msgs';
  public replyUrl = '/fans-msg-reply';
  public onOff = false;
  public userId; // 用户id
  public msgId; // 消息id

  public formDay; // 天数表单
  public formSearch; // 搜索关键词
  public formContent; // 回复内容
  public time; // 时间选择
  selected = 1; // 默认选择项
  public now = new Date();

  currentReplying; // 当前回复
  day; // 天数

  constructor(protected http: HttpClientService,
              private route: ActivatedRoute,
              private router: Router,
              private flashMessages: FlashMessagesService) {
    super(http);
    this.pagination = this.pagination || {};
  }

  ngOnInit() {


    this.formDay = new FormGroup({
      day: new FormControl(''),
    });

    this.formSearch = new FormGroup({
      search: new FormControl(''),
    });

    this.formContent = new FormGroup({
      content: new FormControl('')
    });

    this.load();
  }

  // 加载页面
  load() {
    this.route
      .queryParams
      .subscribe(params => {
        this.formSearch.setValue({
          search: params['search'] || '',
        });
        this.params = Object.assign({page: params['page'], timelimit: this.day}, this.formSearch.value);
        this.fans();
      });
  }


  // 点击回复,回复区域显示
  public showReply(id): void {
    this.msgId = id;
    this.onOff = true;
    this.currentReplying = this.msgId;
    this.formContent.reset();
  }

  // 点击收起,收起回复区域
  public hideReply(): void {
    this.onOff = false;
  }

  // 粉丝列表===get请求

  fans() {
    const params = Object.assign({
      'expand': 'fans,hasReply,isBackendReply',
      'pageSize': '5',
      'page': '1',
      'backend_reply': 0
    }, this.params);
    return this.http.get(this.fansUrl, params).subscribe(
      result => {
        this.dataFans = result;
        this.pagination = this.dataFans._meta;
      },err=>{});

  }


  // 根据不同天数显示不同时间段的用户
  timeChange(ev) {
    if (!ev) {
      return;
    }
    this.day = ev;
    this.router.navigate(['/wechat/wechat-manage/users'], {queryParams: {day: this.day}});
  }

  // 输入关键词搜索
  searchSubmit(formkeyword) {
    if (!this.formSearch.get('search').value) {
      this.flashMessages.wechattip('请输入搜索关键词');
    }
    this.router.navigate(['/wechat/wechat-manage/users'], {queryParams: {search: (formkeyword.search).replace(/\s+/g, "")}});
  }

  // 回复内容发送post请求
  contentSubmit(formContent) {
    if (!formContent) {
      return;
    }
    const params = Object.assign({'msg_content': formContent.content}, this.params);
    return this.http.post(this.replyUrl + '/' + this.msgId, params).subscribe(
      result => {
        this.cancel();
        this.load()
      }, err => {
        if (this.formContent.valid) {
          this.flashMessages.wechattip('回复消息失败！时间间隔超过48小时或者用户取消订阅无法回复消息！');
        }
      })

  }


  /**
   * 翻页方法
   * @param page
   */
  // changePage(page) {
  //   this.router.navigate([this.router.url.split('?')[0]], {
  //     queryParams: {
  //       page: page,
  //       search: this.formSearch.search,
  //       timelimit: this.day
  //     }, queryParamsHandling: 'merge'
  //   })
  // }

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
    window.scroll(0, 0)
  }

  public cancel() {
    this.formContent.reset();
    this.onOff = false;
  }

}
