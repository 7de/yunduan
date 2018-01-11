import {Component, OnInit} from '@angular/core';
import {HttpClientService} from '../../../service/http-client.service';
import {ActivatedRoute, Router, Data} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {MainComponent} from '../../../common/base/main-component';
import {FlashMessagesService} from '../../../service/flash-messages.service';
import {Config} from '../../../config/config';
import {DatetimeHelper} from '../../../common/helper/datetime-helper';
import {SetupHelper} from '../../../common/helper/setup-helper';
import {UsersService} from '../../../service/users.service';

@Component({
  selector: 'app-invested-user',
  templateUrl: './invested-user.component.html',
  styleUrls: ['./invested-user.component.scss']
})

export class InvestedUserComponent extends MainComponent implements OnInit {
  private exportUrl = '/export-excel'; // 导出Url
  public params; // 参数
  public dataUser; // 已投资用户数据接收
  public pagination; //  页码
  public form; //  表单
  public userId: number; //  用户id
  public show: boolean; //  添加投资产品弹框显示与隐藏

  cn: object; // timepicker汉化
  start: Data; // 起始时间
  end: Data; // 到期时间


//  父级tab
  public tabItems = [
    {title: '已投资用户', url: '/main/users/invested'},
    {title: '已浏览用户', url: '/main/users/viewed'},
    {title: '预约记录', url: '/main/users/booked', queryParams: {'kind': 1}},
  ];


  constructor(protected  http: HttpClientService,
              private  route: ActivatedRoute,
              private  router: Router,
              private flashMessages: FlashMessagesService,
              private users: UsersService) {
    super(http);
    this.pagination = this.pagination || {};
  }


  ngOnInit() {
    this.cn = Config.calendarLocaleCN; // 转中文
    //  搜索框实列
    this.form = new FormGroup({
      keyword: new FormControl(''),  //  表单初始值
      start: new FormControl(''), // 起始时间
      end: new FormControl(''), // 结束时间
    });
    this.load();

  }

  // 加载页面
  load() {
    this.route
      .queryParams
      .subscribe(params => {
        this.form.setValue({
          keyword: params['keyword'] || '',
          start: params['start'] ? DatetimeHelper.toDate(params['start']) : '',
          end: params['end'] ? DatetimeHelper.toDate(params['end']) : ''
        });
        this.params = Object.assign(
          {page: params['page'], pageSize: Config.pageSize},
          this.form.value,
          {start: params['start'] || '', end: params['end'] || ''}
        );
        this.index();
        //;(DatetimeHelper.format(DatetimeHelper.toTimestamp(new Date()), 'time'))
      });
  }

  // 已投资用户请求数据===get请求
  index() {
    this.users.invested(this.params).subscribe(
      res => {
        this.dataUser = res['items'];
        this.pagination = res['_meta'];
      });
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
  }


  // 搜索框确定搜索重新加载页面
  public onSubmit(form) {
    let keyword = form.keyword;
    this.router.navigate(['/main/users/invested'], {
      queryParams: {
        keyword: keyword ? keyword.replace(/\s+/g, '') : null,
        start: DatetimeHelper.toTimestamp(form.start) || null,
        end: DatetimeHelper.toTimestamp(form.end) || null,
      }
    });
  }

  /**
   * 投资用户导出
   * @returns {Subscription}
   */
  export() {
    let keyword = this.form.value.keyword ? (this.form.value.keyword).replace(/\s+/g, '') : '';
    let start = DatetimeHelper.toTimestamp(this.form.value.start);
    let end = DatetimeHelper.toTimestamp(this.form.value.end);
    // let now =DatetimeHelper.format(DatetimeHelper.toTimestamp(new Date()),'time');
    let now = new Date().toLocaleString();
    if (this.pagination.totalCount > 0) {
      const params = Object.assign({
        type: 'investor',
        expand: 'orderMoney,profile,orderNumber,orderNew',
        keyword: keyword,
        start: start ? start : '',
        end: end ? end : ''
      });
      return this.http.exportExcel(this.exportUrl, params).subscribe(
        data => SetupHelper.exportData(data, `已投资用户(${now}).xls`)
      )
    } else {
      this.flashMessages.wechatprompt('没有数据可供导出！');
    }
  }

  /**
   * 显示添加投资
   * @param id
   */
  showCreate(id) {
    this.show = true;
    this.userId = id;
  }

  closeShow(bool) {
    if (bool === 0) {
      this.show = bool;
      this.flashMessages.wechatprompt('添加成功！');
      this.index();
    } else {
      this.show = false;
    }
  }

}
