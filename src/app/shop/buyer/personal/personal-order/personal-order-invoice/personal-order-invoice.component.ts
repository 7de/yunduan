import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../../../../service/order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FlashMessagesService} from '../../../../../service/flash-messages.service';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ValidIsEmpty, ValidSelect, ValidTel} from '../../../../../common/shared/validator';

@Component({
  selector: 'app-personal-order-invoice',
  templateUrl: './personal-order-invoice.component.html',
  styleUrls: ['./personal-order-invoice.component.scss']
})
export class PersonalOrderInvoiceComponent implements OnInit {
  form;  // 表单数据
  orderId = this.route.snapshot.params['id'];  // 订单id
  public data; // 发票详情数据
  public invoicePrice;  // 发票价格
  public InvoiceType = 0; // 发票类型 0增值普通发票 1增值专业发票
  public InvoiceStatus = 0;  // 发票的状态 0提交申请 1申请中 2已开发票

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    public router: Router,
    private flashMessages: FlashMessagesService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      type: ['', ValidSelect],            // 发票类型
      title: ['', [ValidIsEmpty]],        // 抬头名称
      invoice_amount: ['', ValidIsEmpty], // 发票金额
      tax_num: ['', ValidIsEmpty],        // 税号
      recipients: ['', ValidIsEmpty],     // 收件人
      recipients_mobile: ['', ValidTel],  // 联系电话
      address: ['', ValidIsEmpty]         // 邮寄地址
    });
    this.load();
  }

  load() {
    // 先查询该订单是否有发票,没有发票在请求订单接口，否则就直接请求发票接口
    this.orderService.getBuyerInvoiceDetails(this.orderId).subscribe(
      res => {
        if (res.constructor === Object) {
          this.data = res;
          this.InvoiceStatus = res['status'] + 1;
          this.InvoiceType = Number(res['type']);
          // 查询发票的数据赋给默认值
          this.form.patchValue(Object.assign({
            type: res['type'],             // 发票类型
            title: res['title'],           // 抬头名称
            invoice_amount: res['money'] + '元',    // 发票金额
            tax_num: res['tax_num'],       // 税号
            recipients: res['recipients'], // 收件人
            recipients_mobile: res['recipients_mobile'], // 联系电话
            address: res['address']        // 邮寄地址
          }, res));
          // 增值专业发票
          if (this.InvoiceType === 1) {
            this.form.addControl('bank_name', new FormControl('', [ValidIsEmpty]));  // 开户银行名称
            this.form.addControl('reg_address', new FormControl('', [ValidIsEmpty]));  // 注册地址
            this.form.addControl('bank_account', new FormControl('', [ValidIsEmpty])); // 开户银行账号
            this.form.addControl('mobile', new FormControl('', [ValidTel]));  // 注册电话
            this.form.controls['bank_name'].setValue(res['bank_name']);
            this.form.controls['reg_address'].setValue(res['reg_address']);
            this.form.controls['bank_account'].setValue(res['bank_account']);
            this.form.controls['mobile'].setValue(res['mobile']);
          }
        } else { // 开发票
          this.InvoiceStatus = 0;
          this.orderService.getOrder({}, this.orderId).subscribe(
            response => {  // 获取该订单详情 -> 价格
              this.invoicePrice = response['money'];
              this.form.controls['invoice_amount'].setValue(this.invoicePrice);
            });
        }
        window.scrollTo(0, 0);
      }
    );
  }

  /**
   * 选择开发票的类型
   */
  invoiceType(ev) {
    this.InvoiceType = Number(ev.target.value);
    if (this.InvoiceType === 1) {
      this.form.addControl('bank_name', new FormControl('', [ValidIsEmpty]));  // 开户银行名称
      this.form.addControl('reg_address', new FormControl('', [ValidIsEmpty]));  // 注册地址
      this.form.addControl('bank_account', new FormControl('', [ValidIsEmpty]));  // 开户银行账号
      this.form.addControl('mobile', new FormControl('', [ValidTel]));  // 注册电话
    } else {
      this.form.removeControl('bank_name');
      this.form.removeControl('reg_address');
      this.form.removeControl('bank_account');
      this.form.removeControl('mobile');
    }
  }

  /**
   * 0普通发票 1专业发票
   */
  onSubmit(form) {
    if (!form.valid) {
      return false;
    }
    Object.assign(form.value, {
      business_order_id: this.orderId  // 订单id
    })
    this.orderService.postInvoice(form.value).subscribe(
      result => {
        /*this.router.navigate(['/buyer/personal/order', this.orderId]);*/
        // this.router.navigate(['/seller/personal/invoiceDetalis'], { queryParams: {'id': this.orderId}});
        this.router.navigate(['/buyer/personal/index/order']);
        this.flashMessages.wechatprompt('提交成功！');
      },
      error => {
        this.flashMessages.wechatprompt('提交失败：' + error);
      }
    )
  }
}
