import {Component, OnInit} from '@angular/core';
import {WechatComponent} from '../../../common/base/wechat-component';
import {HttpClientService} from '../../../service/http-client.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DatetimeHelper} from '../../../common/helper/datetime-helper';
import {FlashMessagesService} from '../../../service/flash-messages.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent extends WechatComponent implements OnInit {

  public detailUrl = '/fans-msgs'; // 获取消息列表Url
  public wechatUrl = '/wechat-info'; // 获取公众号信息Url
  public replyUrl = '/fans-msg-reply';
  public data;
  public params;
  public dataDetail; // 用户具体信息
  public dataList; // 消息列表
  public pagination;
  public form; // 顶部公共回复表单
  public formContent; // 快捷回复表单
  public newsId = this.route.snapshot.params['id'];
  public descriptionLength = 200;
  public onOff = false;
  public currentReplying; // 当前回复
  public msgId; // 消息id
  public createTime; // 消息创立时间
  public now = new Date();

  constructor(protected http: HttpClientService,
              public route: ActivatedRoute,
              public router: Router,
              public flashMessages: FlashMessagesService) {
    super(http);
    this.pagination = this.pagination || {};
  }

  ngOnInit() {
    this.load();
    this.form = new FormGroup({
      reply: new FormControl('', [Validators.required])
    })
    this.formContent = new FormGroup({
      content: new FormControl('', [Validators.required])
    })
  }

  load() {
    this.route
      .queryParams
      .subscribe(params => {
        this.params = {page: params['page']};
        this.fans();
        this.newsList();
        this.wechatInfo()
      });
  }

  // 获取具体用户信息===get请求
  fans() {
    const params = Object.assign({'expand': 'fans,hasReply,isBackendReply', 'pageSize': '5', 'page': '1'}, this.params);
    return this.http.get(this.detailUrl + '/' + this.newsId, params).subscribe(
      result => {
        this.dataDetail = result;
      });
  }

  // 请求用户消息列表===get请求
  newsList() {
    const params = Object.assign({
      'expand': 'fans,hasReply,isBackendReply',
      'pageSize': '5',
      'page': '1',
      message_id: this.newsId
    }, this.params);
    return this.http.get(this.detailUrl, params).subscribe(
      result => {
        this.dataList = result;
        this.pagination = this.dataList._meta;
      });
  }

  // 获取公众号信息===get请求
  wechatInfo() {
    this.http.get(this.wechatUrl).subscribe(
      result => {
        this.data = result;
      });
  }


  // 顶部回复
  onSubmit(form) {
    if (!form) {
      return;
    }
    const params = Object.assign({'msg_content': form.reply}, this.params);
    return this.http.post(this.replyUrl + '/' + this.newsId, params).subscribe(
      result => {
        this.form.reset();
        this.load();
        this.descriptionLength = 200;
      },
      err => {
        if (this.form.valid) {
          this.flashMessages.wechattip('回复消息失败！时间间隔超过48小时或者用户取消订阅无法回复消息！');
        }
      });

  }

  // 快捷回复
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
      });
  }

  onKeyup(event) {
    this.descriptionLength = 200 - (event.target.value.length);
  }

  // 点击回复,回复区域显示
  public showReply(id): void {
    this.msgId = id;
    this.onOff = true;
    this.currentReplying = this.msgId;
  }

  // 点击收起,收起回复区域
  public hideReply(): void {
    this.onOff = false;
  }

  public cancel() {
    this.formContent.reset();
    this.onOff = false;
  }

  /**
   * 翻页方法
   * @param page
   */
  // changePage(page) {
  //   this.router.navigate([this.router.url.split('?')[0]], {
  //     queryParams: {
  //       page: page,
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

}
