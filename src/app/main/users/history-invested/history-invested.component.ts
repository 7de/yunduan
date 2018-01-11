import {Component, OnInit} from '@angular/core';
import {HttpClientService} from '../../../service/http-client.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {MainComponent} from '../../../common/base/main-component';
import {DatetimeHelper} from '../../../common/helper/datetime-helper';
import {FlashMessagesService} from '../../../service/flash-messages.service';
import {UsersService} from '../../../service/users.service';
import {Config} from '../../../config/config';


@Component({
  selector: 'app-history-invested',
  templateUrl: './history-invested.component.html',
  styleUrls: ['./history-invested.component.scss']
})
export class HistoryInvestedComponent extends MainComponent implements OnInit {

  public userId = this.route.snapshot.params['id']; // 路由获取id值 ;
  public totalUrl = '/order/money';
  public params;
  public pagination; // 页码
  public dataHistory; // 历史记录数据
  public totalMoney; // 历史投资金额
  public formGroup: FormGroup; // 表单
  public show: boolean; // 添加投资记录弹框显示与隐藏

  // 父级tab标签
  public tabItems = [
    {title: '用户信息', url: '/main/users/info' + '/' + this.userId},
    {title: '历史投资记录', url: '/main/users/history' + '/' + this.userId},
    {title: '跟踪记录', url: '/main/users/tracking' + '/' + this.userId},
  ];

  constructor(protected http: HttpClientService,
              private route: ActivatedRoute,
              private router: Router,
              private flashMessages: FlashMessagesService,
              private users: UsersService) {
    super(http);
    this.pagination = this.pagination || {};
  }


  ngOnInit() {
    this.load();
  }

  load() {
    this.route
      .queryParams
      .subscribe(params => {
        this.params = {
          page: params['page'],
          pageSize: Config.pageSize,
        };
        this.history();
        this.total();
      });
  }

  history() {
    const params = Object.assign({'user_id': this.userId}, this.params)
    this.users.history(params).subscribe(
      res => {
        this.dataHistory = res['items'];
        this.pagination = res['_meta'];
      });
  }


  /**
   * 分页操作数据
   * @param e
   */
  paginate(e) {
    this.router.navigate([this.router.url.split('?')[0]], {
      queryParams: {page: e.page + 1,},
      queryParamsHandling: 'merge'
    });
  }


  // 返回跳转
  public toInvestedUser() {
    this.router.navigate(['main/users/invested'])
  }


  total() {
    const params = Object.assign({'user_id': this.userId}, this.params);
    return this.http.get(this.totalUrl, params).subscribe(
      result => {
        this.totalMoney = result;
      });
  }


  /**
   * 显示添加投资
   * @param id
   */
  showCreate() {
    this.show = true;
    this.userId = this.route.snapshot.params['id']; // 路由获取id值
  }

  closeShow(bool) {
    if (bool === 0) {
      this.show = bool;
      this.flashMessages.wechatprompt('添加成功！');
    } else {
      this.show = false;
    }
    this.load();
  }


  diffDateTime(start, end) {
    if (start && end) {
      return DatetimeHelper.diff(start, end);
    }
  }


}
