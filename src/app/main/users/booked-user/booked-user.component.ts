import {Component, OnInit, Injectable} from '@angular/core';
import {HttpClientService} from '../../../service/http-client.service';
import {ActivatedRoute, Router, Params, Data} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MainComponent} from '../../../common/base/main-component';
import {FlashMessagesService} from '../../../service/flash-messages.service';
import {Config} from '../../../config/config';
import {DatetimeHelper} from '../../../common/helper/datetime-helper';
import {SetupHelper} from '../../../common/helper/setup-helper';
import {UsersService} from '../../../service/users.service';
import {ValidDetails} from '../../../common/shared/validator';
import {LocalStorageService} from '../../../service/local-storage.service';
import {UsersBooked} from '../../../interface/usersBooked';

@Component({
  selector: 'app-booked-user',
  templateUrl: './booked-user.component.html',
  styleUrls: ['./booked-user.component.css']
})

export class BookedUserComponent extends MainComponent implements OnInit {

  public exportUrl = '/export-excel'; // 导出
  public params;
  public dataBook; // 预约记录数据
  public pagination; // 页码
  public formGroup: FormGroup;

  public userId; // 用户id

  // 预约记录标记需要参数

  public companyId; // 基金公司id
  public productId; // 基金id
  public appointmentId; // 预约记录id

  public selected = 1; // 默认选择


  // 弹框显示与隐藏
  public show: boolean; // 添加投资记录弹框

  public showProduct: boolean; // 基金产品查看弹框

  public showMark: boolean; // 标记弹框

  public form; // 搜索表格
  public myForm; // 标记弹框

  public day = this.route.snapshot.queryParams['day']; // 7天/30天
  public kind; // 回复/待回复
  public cn: object; // timepicker时间汉化
  public start: Data; // 起始时间
  public end: Data; // 到期时间
  public descriptionLength = 200;

  // 父级tab
  public tabItems = [
    {title: '已投资用户', url: '/main/users/invested'},
    {title: '已浏览用户', url: '/main/users/viewed'},
    {title: '预约记录', url: '/main/users/booked'},
  ];

  // 子tab
  public tabItemsC = [
    {title: '待回复', url: '/main/users/booked', queryParams: {'kind': 1}},
    {title: '已回复', url: '/main/users/booked', queryParams: {'kind': 0}}
  ];

  constructor(protected http: HttpClientService,
              private route: ActivatedRoute,
              private router: Router,
              private flashMessages: FlashMessagesService,
              private localStorage: LocalStorageService,
              private users: UsersService) {
    super(http);
    this.pagination = this.pagination || {};
  }

  ngOnInit() {

    this.cn = Config.calendarLocaleCN; // 汉化

    this.form = new FormGroup({
      keyword: new FormControl('', [ValidDetails]), // 表单初始值
      start: new FormControl(''), // 起始时间
      end: new FormControl(''), // 结束时间
    });

    this.myForm = new FormGroup({
      status: new FormControl('', [ValidDetails]),
      markContent: new FormControl('', [ValidDetails]),
    })

    this.load();
    this.saveValue();

  }

  // 加载页面
  load() {
    this.route
      .queryParams
      .subscribe(params => {
        this.form.setValue({
          keyword: params['keyword'] || '',
          // day: params['day'],  //此功能暂时取消！请勿删除
          start: params['start'] ? DatetimeHelper.toDate(params['start']) : '',
          end: params['end'] ? DatetimeHelper.toDate(params['end']) : '',
        });
        this.params = Object.assign({
          page: params['page'],
          pageSize: Config.pageSize,
          kind: params['kind'],
        }, this.form.value, {
          start: params['start'] || '',
          end: params['end'] || ''
        });
        this.kind = params['kind'];
        this.book();
      });
  }

  onKeyup(event) {
    this.descriptionLength = 200 - (event.target.value.length);
  }

  saveValue() {
    this.localStorage.setObject('capacity', {'submitteds': true});
  }


  // 搜索按钮确定搜索加载页面===get请求
  public onSubmit(form) {
    this.router.navigate(['/main/users/booked'], {
      queryParams: {
        kind: this.kind,
        keyword: (form.keyword) ? (form.keyword).replace(/\s+/g, '') : null,
        start: DatetimeHelper.toTimestamp(form.start) || null,
        end: DatetimeHelper.toTimestamp(form.end) || null
      }
    });
  }

  // 预约用户导出
  export() {
    let start = DatetimeHelper.toTimestamp(this.form.value.start);
    let end = DatetimeHelper.toTimestamp(this.form.value.end);
    let keyword = this.form.value.keyword ? (this.form.value.keyword).replace(/\s+/g, '') : '';
    // let now =DatetimeHelper.format(DatetimeHelper.toTimestamp(new Date()),'time');
    let now = new Date().toLocaleString();
    if (this.pagination.totalCount > 0) {
      const params = Object.assign({
        'type': 'booking',
        'expand': 'user,profile,foundation',
        'kind': this.kind,
        'keyword': keyword,
        'start': start ? start : '',
        'end': end ? end : '',
      });
      return this.http.exportExcel(this.exportUrl, params).subscribe(
        data => SetupHelper.exportData(data, `预约用户(${now}).xls`)
      )
    } else {
      this.flashMessages.wechatprompt('没有数据可供导出！');
    }
  }

  book() {
    this.users.booked(this.params).subscribe(
      res => {
        this.dataBook = res['items'];
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
        page: e.page + 1,
      },
      queryParamsHandling: 'merge'
    });
  }


  // 标记确定发送数据==post请求
  public mark(form) {
    if (!form.valid) {
      return false;
    }
    const params = Object.assign({
        'user_id': this.userId,
        'company_id': this.companyId,
        'foundation_id': this.productId,
        'marks': form.value.status,
        'content': form.value.markContent,
        'appointment_id': this.appointmentId
      }
    );
    this.users.mark(params).subscribe(
      res => {
        this.cancel();
        this.flashMessages.wechatprompt('标记成功！');
        this.router.navigate(['/main/users/booked'], {queryParams: {kind: 0}});
      }
    )
  }


  // 预约记录---投资产品查看弹框
  public product(id): void {
    this.productId = id;
    this.showProduct = true;
  };

  // 预约记录---标记弹框
  public addMark(book: UsersBooked): void {
    this.userId = book.user_id;
    this.productId = book.foundation_id;
    this.companyId = book.company_id;
    this.appointmentId = book.id;
    this.showMark = true; // 标记弹框显示
  };


  // 弹框隐藏
  public cancel() {
    this.showMark = false;
    this.myForm.reset();
    this.descriptionLength = 200;
  };

  /**
   * 显示添加投资
   * @param id
   */
  showCreate(id) {
    this.show = true;
    this.userId = id;
  }


  // 关闭添加投资
  closeShow(bool) {
    if (bool === 0) {
      this.show = bool;
      this.flashMessages.wechatprompt('添加成功！')
    } else {
      this.show = false;
    }
    this.book();
  }

// 关闭产品查看
  closeProduct(bool) {
    this.showProduct = bool;
  }

}
