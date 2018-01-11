import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ValidBlend} from '../../../../../../common/shared/validator';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {FlashMessagesService} from '../../../../../../service/flash-messages.service';
import {OrderService} from '../../../../../../service/order.service';

@Component({
  selector: 'app-invoice-detalis',
  templateUrl: './invoice-detalis.component.html',
  styleUrls: ['./invoice-detalis.component.scss']
})
export class InvoiceDetalisComponent implements OnInit {
  formGroup;
  data;
  public form;
  public timer;
  public invoiceDetalis;  // 发票详情数据
  public isdisabled = false;  // 提交按钮是否可以点击
  public invoiceId = this.route.snapshot.queryParams['id'];
  qqFirst = 'tencent://message/?v=3&amp;uin='; // qq链接
  qqLast = '&amp;site=qq&amp;menu=yes';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private flashMessages: FlashMessagesService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    // 获取私聊的链接
    this.orderService.getSellerOrder({}, this.invoiceId).subscribe(res => {
      this.data = res;
    });
    this.form = new FormGroup({
      post_num: new FormControl('', [Validators.required]),  // 快递单号
      post_company: new FormControl('', [Validators.required])  // 快递公司
    });
    this.details(); // 发票详情
  }

  /**
   * 发票详情
   */
  details() {
    this.orderService.getSellerInvoiceDetails(this.invoiceId).subscribe(
      res => {
        this.invoiceDetalis = res; // 发票详情数据
        this.form.patchValue(Object.assign({
          post_num: res['post_num'],  // 快递单号
          post_company: res['post_company']  // 快递公司
        }, res))
      }
    )
  }

  /**
   * 处理显示日期时间
   */
   timeHandle(time , type = 1) {
     let timearr = time.split(' ');
     if (type === 1) {
       return timearr[0];
     } else {
       return timearr[1];
     }
   }

  /**
   * 开出发票
   * @param form
   * @returns {boolean}
   */
  onSubmit(form) {
    if (!form.valid) {
      return false;
    }
    const params = {
      'post_num': form.value.post_num,   // 快递单号
      'post_company': form.value.post_company,  // 快递公司
      'invoice_id': this.invoiceId
    };
    this.openInvoice(params);  // 开发票请求
  }

  /**
   * 开发票请求
   */
  openInvoice(params) {
    this.orderService.putOpenInvoice(params).subscribe(
      res => {
        this.isdisabled = true;
        this.flashMessages.wechatprompt('开取成功！');
        this.timer = setTimeout(() => {
          this.router.navigateByUrl('/seller/personal/index/invoice/list');  // 开发票成功，跳转到发票列表页
        }, 2000);
      });
  }
}
