import {Component, OnInit} from '@angular/core';
import {HttpClientService} from '../../../service/http-client.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {MainComponent} from '../../../common/base/main-component';
import {UsersService} from '../../../service/users.service';
import {Config} from '../../../config/config';
import {ObjectHelper} from '../../../common/helper/object-helper';


@Component({
  selector: 'app-viewed-user',
  templateUrl: './viewed-user.component.html',
  styleUrls: ['./viewed-user.component.css']
})
export class ViewedUserComponent extends MainComponent implements OnInit {


  public params;
  public dataViewed;
  public pagination; // 页码

  // 父级tab
  public tabItems = [
    {title: '已投资用户', url: '/main/users/invested'},
    {title: '已浏览用户', url: '/main/users/viewed'},
    {title: '预约记录', url: '/main/users/booked', queryParams: {'kind': 1}},
  ];

  form; // 表格
  hasOrder;
  hasAppointment;
  selected = 1;

  constructor(protected http: HttpClientService,
              private route: ActivatedRoute,
              private router: Router,
              private users: UsersService) {
    super(http);
    this.pagination = this.pagination || {};
  }


  ngOnInit() {

// 搜索框、是否已投资下拉框、是否已预约下拉框
    this.form = new FormGroup({
      keyword: new FormControl(''), // 表单初始值
      hasOrder: new FormControl(''),
      hasAppointment: new FormControl('')
    });

    this.load();
  }

  // // 加载页面
  load() {
    this.route
      .queryParams
      .subscribe(params => {
        this.form.setValue({
          keyword: params['keyword'] || '',
          hasOrder: params['hasOrder'] || '全部',
          hasAppointment: params['hasAppointment'] || '全部'
        });
        this.params = Object.assign({
          page: params['page'],
          pageSize: Config.pageSize,
          // keyword: params['keyword'],
          // hasOrder: this.hasOrder,
          // hasAppointment: this.hasAppointment
        }, this.form.value);
        this.index();
      });
  }


  // 搜索按钮搜索重新加载页面===get请求

  public onSubmit(form) {
    let keyword = form.keyword;
    this.router.navigate(['/main/users/viewed'], {
      queryParams: {
        keyword: keyword ? keyword.replace(/\s+/g, '') : null,
        hasOrder: form.hasOrder || null,
        hasAppointment: form.hasAppointment || null
      }
    });
  }

  // 已浏览用户请求数据===get请求

  index() {
    this.users.viewed(this.params).subscribe(
      res => {
        this.dataViewed = res['items'];
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
        'page': e.page + 1,
      },
      queryParamsHandling: 'merge'
    });
  }

  // 下拉框发生改变发送请求
  public onChange(form) {
    this.hasOrder = form.hasOrder;
    this.hasAppointment = form.hasAppointment;
  }

}
