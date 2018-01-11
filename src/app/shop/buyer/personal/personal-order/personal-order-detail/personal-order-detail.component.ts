import {Component, OnInit} from '@angular/core';
import {OrderService} from '#{service}/order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FlashMessagesService} from '#{service}/flash-messages.service';

@Component({
  selector: 'app-personal-order-detail',
  templateUrl: './personal-order-detail.component.html',
  styleUrls: ['./personal-order-detail.component.scss']
})
export class PersonalOrderDetailComponent implements OnInit {

  data;
  orderId = this.route.snapshot.params['id'];
  shopDialog = 'shop-dialog'; // 弹框class名
  customerShow: Boolean = false;
  cancelShow: Boolean = false;  // 撤销申请订单
  applicationShow: Boolean = false; // 申请取消订单
  applicationError: Boolean = false;
  applicationReason;
  applicationId;
  revokeShow; // 撤销申请取消订单
  agreeShow; // 同意取消订单
  platformShow; // 申请仲裁(客服介入)
  confirmShow; // 确认方案
  checkShow; // 验收交付
  qqFirst = 'tencent://message/?v=3&amp;uin='; // qq链接
  qqLast = '&amp;site=qq&amp;menu=yes';

  constructor(private orderService: OrderService, private route: ActivatedRoute, public router: Router, private flashMessages: FlashMessagesService) {
  }

  ngOnInit() {
    this.load();
  }

  /*
  * 初始化
  * */
  load() {
    this.orderService.getOrder({}, this.orderId).subscribe(res => {
      this.data = res;
    });
    window.scrollTo(0, 0);
  }

  /*
  * 取消订单
  * */
  cancelEven(id) {
    this.orderService.getCloseOrder(id).subscribe(res => {
      this.flashMessages.wechatprompt(`<i class="ico-global ico-tip-green"></i><div class="mt-5 text-center">操作成功</div>`);
      this.load();
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
    this.orderService.putCancelOrder({
      business_order_id: id,
      reason: res
    }).subscribe(result => {
      this.flashMessages.wechatprompt(`<i class="ico-global ico-tip-green"></i><div class="mt-5 text-center">提交成功</div>`);
      let timer = setTimeout( () => {
        this.load();
      }, 1500);
      this.applicationShow = false;
    }, error => this.flashMessages.wechatprompt('失败：' + error));
  }

  /*
  * 撤销取消订单
  * */
  revokeEven(id) {
    this.orderService.getCancel(id).subscribe(res => {
      this.flashMessages.wechatprompt(`<i class="ico-global ico-tip-green"></i><div class="mt-5 text-center">操作成功</div>`);
      let timer = setTimeout( () => {
        this.load();
      }, 1500);
      this.revokeShow = false;
    }, error => this.flashMessages.wechatprompt('失败：' + error))
  }

  /*
  * 同意取消订单
  * */
  agreeEven(id) {
    this.orderService.getAgreeCancel(id).subscribe(res => {
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
  platformEven(id) {
    this.orderService.getPlatform(id).subscribe(res => {
      this.flashMessages.wechatprompt(`<i class="ico-global ico-tip-green"></i><div class="mt-5 text-center">操作成功</div>`);
      let timer = setTimeout( () => {
        this.load();
      }, 1500);
      this.platformShow = false;
    }, error => this.flashMessages.wechatprompt('失败：' + error))
  }

  /**
   * 倒计时结束
   * @param e 返回值
   */
  countEven(e) {
    if (e) {
      this.load();
    }
  }

  // 确认方案
  confirmEven(id) {
    this.orderService.getBuyersConfirm(id).subscribe(res => {
        this.flashMessages.wechatprompt(`<i class="ico-global ico-tip-green"></i><div class="mt-5 text-center">确认成功</div>`);
        let timer = setTimeout( () => {
          this.load();
        }, 1500);
        this.confirmShow = false;
      },
      err => this.flashMessages.wechatprompt(err));
  }

  // 确认验收
  checkEven(id) {
    this.orderService.getCheckOrder(id).subscribe(res => {
        this.flashMessages.wechatprompt(`<i class="ico-global ico-tip-green"></i><div class="mt-5 text-center">确认成功</div>`);
        let timer = setTimeout( () => {
          this.load();
        }, 1500);
        this.checkShow = false;
      },
      err => this.flashMessages.wechatprompt(err));
  }


}
