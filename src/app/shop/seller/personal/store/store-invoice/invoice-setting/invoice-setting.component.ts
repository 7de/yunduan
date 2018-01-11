import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from '../../../../../../service/flash-messages.service';
import {ShopService} from '../../../../../../service/shop.service';
import {OrderService} from '../../../../../../service/order.service';

@Component({
  selector: 'app-invoice-setting',
  templateUrl: './invoice-setting.component.html',
  styleUrls: ['./invoice-setting.component.scss']
})
export class InvoiceSettingComponent implements OnInit {
  btnone: boolean;
  btntwo: boolean;
  btn: boolean;
  public commoned = false;
  type;
  public major = false;

  public textbtned;
  constructor(
    private flashMessages: FlashMessagesService,
    private shopService: ShopService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
      this.invoiceType();

  }




  /*
  * 普通发票
  *
  * */


  typeCommon() {
    this.major = false;
    this.commoned = true;
    this.btnone = true;
    this.textbtned = true;
  }

  typeMajor() {
   this.major = true;
   this.commoned = false;
   this.btntwo = true;
   this.textbtned = true;
  }

  /*
  * 获取当前发票类型
  *
  * */
  invoiceType() {
      this.shopService.getLoginShopInfo({}).subscribe(
          res => {
              this.type = res;
              if (this.type.invoice_type === 1) {
                  this.major = true;
              }
              if (this.type.invoice_type === 0) {
                  this.commoned = true;
              }
        });
  }


  btned () {
    if (this.btnone === true) {
      this.orderService.postInvoiceType( {invoice_type: 0}).subscribe(
         res => {
           this.flashMessages.wechatprompt('保存成功！');
         });
    }
    if (this.btntwo === true) {
      this.orderService.postInvoiceType({invoice_type: 1}).subscribe(
        res => {
          this.flashMessages.wechatprompt('保存成功！');
        }
      )
    }
  }

}
