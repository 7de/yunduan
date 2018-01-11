import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ValidDetails} from '../../../../../common/shared/validator';
import {EstimateService} from '#{service}/estimate.service';
import {ShopService} from '#{service}/shop.service';
import {OrderService} from '#{service}/order.service';
import {FlashMessagesService} from '#{service}/flash-messages.service';
import {Config} from '#{config}/config';

@Component({
  selector: 'app-personal-order-estimate',
  templateUrl: './personal-order-estimate.component.html',
  styleUrls: ['./personal-order-estimate.component.scss']
})
export class PersonalOrderEstimateComponent implements OnInit {
  public valAttitude: Number = 0;
  public valRate: Number = 0;
  public valQuality: Number = 0;
  public orderId = this.route.snapshot.params['id'];
  public form;
  public scoreList;
  public params;
  public shopId;
  public descriptionLength = 200;
  public goodsDetail;

  constructor(public estimate: EstimateService,
              public route: ActivatedRoute,
              public router: Router,
              private shop: ShopService,
              private orderService: OrderService,
              public flashMessages: FlashMessagesService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      attitude: new FormControl('', [ValidDetails]),
      rate: new FormControl('', [ValidDetails]),
      quality: new FormControl('', [ValidDetails]),
      // evaluate: new FormControl('', [ValidDetails]),
      grade: new FormControl('0'),
      replyContent: new FormControl('', [ValidDetails])
    });
    this.load();
  }

  load() {
    this.route
      .queryParams
      .subscribe(params => {
        this.params = Object.assign(
          {
            page: params['page'],
            pageSize: Config.pageSize
          }
        );
        this.orderDetail();
      })
  }

  onSubmit(form) {
    if (form.value.attitude === 0 || form.value.rate === 0 || form.value.quality === 0 ) {
      return this.flashMessages.wechatprompt('请给商家的服务进行评分');
    }
    if (!form.valid) {
      return false;
    }
    const params = Object.assign({
      'business_order_id': this.orderId,
      'serve_star': form.value.attitude,
      'work_star': form.value.rate,
      'quality_star': form.value.quality,
      'grade': form.value.grade,
      'content': form.value.replyContent
    });
    this.estimate.estimateToSeller(params).subscribe(
      res => {
        this.flashMessages.wechatprompt('评价成功！');
        setTimeout( () => {
          this.router.navigate(['/buyer/personal/index/order'], {queryParams: {'type': ''}})
        }, 2000)

      }
    )
  }

  // 对数值取整
  handle(num) {
    return Math.round(num)
  }

  onKeyup(event) {
    this.descriptionLength = 200 - (event.target.value.length);
  }


  // 商家累计半年的好中差评
  show() {
    const params = Object.assign(this.params, {'expand': 'commentNum,goodNum,medium,bad'});
    this.shop.shopDetail(params , this.shopId ).subscribe(
      res => {
        this.scoreList = res;
      }
    );
  }
  orderDetail() {
    this.orderService.getOrder({}, this.orderId).subscribe(res => {
      this.goodsDetail = res;
      this.shopId = res['shop']['id'];
      this.show();
    })
  }

}
