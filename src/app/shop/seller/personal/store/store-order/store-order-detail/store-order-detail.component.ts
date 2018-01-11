import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FlashMessagesService} from '#{service}/flash-messages.service';
import {ConfirmationService} from 'primeng/components/common/confirmationservice';
import {OrderService} from '#{service}/order.service';

@Component({
  selector: 'app-store-order-detail',
  templateUrl: './store-order-detail.component.html',
  styleUrls: ['./store-order-detail.component.scss']
})
export class StoreOrderDetailComponent implements OnInit {

  data;
  orderId = this.route.snapshot.params['id'];
  shopDialog = 'shop-dialog'; // 弹框class名
  customerShow: Boolean = false;
  cancelShow: Boolean = false;  // 撤销申请订单
  cancelTitle;
  cancelId;
  revokeShow: Boolean = false;  // 撤销申请
  revokeId;
  applicationShow: Boolean = false; // 申请取消订单
  applicationError: Boolean = false;
  applicationReason;
  applicationId;
  agreeShow; // 同意取消订单
  agreeId;
  platformShow; // 申请仲裁(客服介入)
  platformId;
  priceShow: Boolean = false; // 修改价格
  priceError: Boolean = false;
  priceNumError: Boolean = false;
  priceData;
  priceNum;
  qqFirst = 'tencent://message/?v=3&amp;uin=';
  qqLast = '&amp;site=qq&amp;menu=yes';

  constructor(private orderService: OrderService, private route: ActivatedRoute, public router: Router, private flashMessages: FlashMessagesService, private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.orderService.getSellerOrder({}, this.orderId).subscribe(res => {
      this.data = res;
      // console.log(this.data);
    });
    window.scrollTo(0, 0);
  }

  /*
  * 联系客服
  * */
  customerDialog() {
    this.customerShow = true;
  }

  /*
  * 取消订单 -- 未付款
  * */
  cancelOrder(title, id) {
    this.cancelTitle = title;
    this.cancelId = id;
    this.cancelShow = true;
  }

  cancelEven(id) {
    this.orderService.getSellerClose(id).subscribe(res => {
      this.flashMessages.wechatprompt(`<i class="ico-global ico-tip-green"></i><div class="mt-5 text-center">操作成功</div>`);
      let timer = setTimeout( () => {
        this.load();
      }, 1500);
      this.cancelShow = false;
    }, error => this.flashMessages.wechatprompt('失败：' + error));
  }

  /*
  * 申请取消订单
  * */
  applicationCancel(id, res?) {
    this.applicationError = false;
    this.applicationReason = res || '';
    this.applicationId = id;
    this.applicationShow = true;
  }

  applicationEven(id, res) {
    this.applicationError = false;
    if (!res) {
      this.applicationError = true;
      return false;
    }
    this.orderService.putSellerCancel({
      business_order_id: id,
      reason: res
    }).subscribe(res => {
      this.flashMessages.wechatprompt(`<i class="ico-global ico-tip-green"></i><div class="mt-5 text-center">提交成功</div>`);
      let timer = setTimeout( () => {
        this.load();
      }, 1500);
      this.applicationShow = false;
    }, error => this.flashMessages.wechatprompt('失败：' + error));
  }

  /*
  * 撤销申请订单
  * */
  revokeOrder(id) {
    this.revokeId = id;
    this.revokeShow = true;
  }

  revokeEven(id) {
    this.orderService.getSellerCancel(id).subscribe(res => {
      this.flashMessages.wechatprompt(`<i class="ico-global ico-tip-green"></i><div class="mt-5 text-center">操作成功</div>`);
      let timer = setTimeout( () => {
        this.load();
      }, 1500);
      this.revokeShow = false;
    }, error => this.flashMessages.wechatprompt('失败：' + error));
  }


  /*
  * 同意取消订单
  * */
  agreeOrder(id) {
    this.agreeId = id;
    this.agreeShow = true;
  }

  agreeEven(id) {
    this.orderService.getSellerAgree(id).subscribe(res => {
      this.flashMessages.wechatprompt(`<i class="ico-global ico-tip-green"></i><div class="mt-5 text-center">操作成功</div>`);
      let timer = setTimeout( () => {
        this.load();
      }, 1500);
      this.agreeShow = false;
    }, error => this.flashMessages.wechatprompt('失败：' + error))
  }

  /*
  * 申请仲裁(客服介入)
  * */
  platformOrder(id) {
    this.platformId = id;
    this.platformShow = true;
  }

  platformEven(id) {
    this.orderService.getSellerPlatform(id).subscribe(res => {
      this.flashMessages.wechatprompt(`<i class="ico-global ico-tip-green"></i><div class="mt-5 text-center">操作成功</div>`);
      let timer = setTimeout( () => {
        this.load();
      }, 1500);
      this.platformShow = false;
    }, error => this.flashMessages.wechatprompt('失败：' + error))
  }


  /*
  * 修改价格priceShow
  * */
  modifyPrice(data) {
    this.priceShow = true;
    this.priceData = data;
    this.priceNum = null;
    this.priceError = false;
    this.priceNumError = false;
  }

  priceEven(id, price) {
    this.priceError = false;
    this.priceNumError = false;
    if (!Number(price)) {
      this.priceError = true;
      return false;
    }
    if(Number(price)){
      let priceN = String(price).split('.');
      if(priceN.length > 1){
        if(priceN[1].length > 2){
          this.priceNumError = true;
          return false;
        }
      }
      if (price < 0.00 || price > 9999999.99) {
        this.priceNumError = true;
        return false;
      }
    }
    this.orderService.putPrice({
      business_order_id: id,
      money: price
    }).subscribe(res => {
      this.flashMessages.wechatprompt(`<i class="ico-global ico-tip-green"></i><div class="mt-5 text-center">操作成功</div>`);
      let timer = setTimeout( () => {
        this.load();
      }, 1500);
      this.priceShow = false;
    }, error => this.flashMessages.wechatprompt('失败：' + error));

  }

  /**
   * 倒计时结束
   * @param e 返回值
   */
  countEven(e){
    if(e){
      this.load();
    }
  }

}
