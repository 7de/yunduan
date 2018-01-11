import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EstimateService} from '#{service}/estimate.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FlashMessagesService} from '#{service}/flash-messages.service';
import {OrderService} from '#{service}/order.service';

@Component({
  selector: 'app-store-order-estimate',
  templateUrl: './store-order-estimate.component.html',
  styleUrls: ['./store-order-estimate.component.scss']
})
export class StoreOrderEstimateComponent implements OnInit {
  form;
  orderId = this.route.snapshot.queryParams['id'];
  orderData;

  constructor(private estimate: EstimateService, private orderService: OrderService, private router: Router, private route: ActivatedRoute, private flashMessages: FlashMessagesService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      grade: new FormControl('0'),
      content: new FormControl('', Validators.required)
    });
    this.load();
  }

  /**
   * 初始化-加载订单信息
   */
  load() {
    this.orderService.getSellerOrder({}, this.orderId).subscribe(res => {
      this.orderData = res;
    });
    window.scrollTo(0, 0);
  }

  /**
   * 首次评价
   * @param form 表单值
   */

  onSubmit(form) {
    if (!form.valid) {
      return false;
    }
    const params = Object.assign(form.value, {business_order_id: this.orderId});
    this.estimate.estimateToBuyer(params).subscribe(res => {
      this.flashMessages.wechatprompt(`<i class="ico-global ico-tip-green"></i><div class="mt-5 text-center">评价成功</div>`);
      this.router.navigate(['/seller/personal/index/order'], {
        queryParams: {type: ' '}
      });
    }, error => this.flashMessages.wechatprompt('失败：' + error))
  }

}
