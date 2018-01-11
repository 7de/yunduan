import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Config} from '../../../../../../config/config';
import {OrderService} from '../../../../../../service/order.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {

  public invoiceList: Array<any> = [];
  public pagination;
  public form;
  public screeningStatus = this.route.snapshot.queryParams['status'] || ''; // 筛选的状态
  file: any[];
  public titles = ''; // 搜索的内容
  public isData = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {
    this.file = [];
    this.pagination = this.pagination || {};
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl('')
      /*,status: new FormControl('', [Validators.required])*/
    });
    this.init();
  }
  init() {
    this.route
      .queryParams
      .subscribe(params => {
        this.index({
          page: params['page'],
          title: params['title'] || '',
          pageSize: Config.pageSize,
          status: params['status'] || ''
        });
      });
  }

  /**
   * 发票筛选条件
   */
  screenStatus(ev) {
    if (ev === '0') {
      this.screeningStatus = 0;
    } else if (ev === '1') {
      this.screeningStatus = 1;
    } else {
      this.screeningStatus = '';
    }
    this.form.controls['title'].setValue('');
    let title = this.titles;
    this.router.navigate(['/seller/personal/index/invoice/list'], {
      queryParams: {
        status: this.screeningStatus
      },
      queryParamsHandling: 'merge'
    });
  }

  /**
   * 输入框输入事件
   */
  searchcons(event) {
    this.titles = event;
  }

  /**
   * 展示发票列表
   * @param params
   */
  index(params) {
    Object.assign(params, { expand: 'businessOrder, goods' });
    this.orderService.getSellerInvoiceList(params).subscribe(
      res => {
        this.invoiceList = res['items'];
        this.pagination = res['_meta'];
        if (this.invoiceList) {
          this.isData = false;
        } else {
          this.isData = true;
        }
      },
      error => {
        this.isData = true;
      });
  }

  /**
   * 搜索按钮搜索发票列表页面
   * @param form
   */
  onSubmitType(form) {
    let title = form.title;
    this.router.navigate(['/seller/personal/index/invoice/list'], {
      queryParams: {
        status: this.screeningStatus,
        title: title ? title : ''
      },
      queryParamsHandling: 'merge'
    });
  }

  /**
   * 分页操作数据
   * @param e
   */
  paginate(e) {
    this.router.navigate([this.router.url.split('?')[0]], {
      queryParams: {page: e.page + 1},
      queryParamsHandling: 'merge'
    });
    window.scrollTo(0, 0);
  }
}
