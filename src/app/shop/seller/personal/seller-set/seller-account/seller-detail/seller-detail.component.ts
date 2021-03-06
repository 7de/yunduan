import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {PayService} from '#{service}/pay.service';
import {LocalStorageService} from '#{service}/local-storage.service';
import {Config} from '#{config}/config';
import {DatetimeHelper} from '#{common}/helper/datetime-helper';

@Component({
  selector: 'app-seller-detail',
  templateUrl: './seller-detail.component.html',
  styleUrls: ['./seller-detail.component.scss']
})
export class SellerDetailComponent implements OnInit {

  params;
  detailList;
  form;
  cn: object; // timepicker汉化
  public pagination; //  页码
  users;
  companyType = this.localStorage.get('companyType');
  constructor(public route: ActivatedRoute,
              private pay: PayService,
              public router: Router,
              public localStorage: LocalStorageService) {
    this.pagination = this.pagination || {};
  }

  ngOnInit() {
    if (this.companyType === '0') {
      this.users = 'buyer';
    }else if (this.companyType === '1') {
      this.users = 'seller'
    }
    this.cn = Config.calendarLocaleCN; // 转中文
    this.load();
    this.form = new FormGroup({
      start: new FormControl(''), // 起始时间
      end: new FormControl(''), // 结束时间
    });
  }

  load() {
    this.route
      .queryParams
      .subscribe(params => {
        this.params = Object.assign(
          {
            page: params['page'],
            pageSize: Config.pageSize,
            start: params['start'],
            end: params['end'],
            pay_type: params['pay_type'],
          }
        );
        this.detail();
      })
  }

  // 收支明细请求数据
  detail() {
    return this.pay.sellerDetail(this.params).subscribe(
      res => {
        this.detailList = res['items'];
        this.pagination = res['_meta'];
      }
    )
  }

  // 搜索框确定搜索重新加载页面
  public onSubmit(form) {
    this.router.navigate(['/seller/detail'], {
      queryParams: {
        // start: DatetimeHelper.format(DatetimeHelper.toTimestamp(form.start) || null, 'datetime'),
        // end: DatetimeHelper.format(DatetimeHelper.toTimestamp(form.end) || null, 'datetime')
        start: DatetimeHelper.toTimestamp(form.start) || null,
        end: DatetimeHelper.toTimestamp(form.end) || null
      }
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
    window.scroll(0, 0)
  }

}
