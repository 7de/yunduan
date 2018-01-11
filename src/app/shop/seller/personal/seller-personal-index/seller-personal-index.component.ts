import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BusinessService} from '../../../../service/business.service';
import {HttpClientService} from '../../../../service/http-client.service';
import {Config} from '../../../../config/config';
import {OrderService} from '../../../../service/order.service';

@Component({
  selector: 'app-seller-personal-index',
  templateUrl: './seller-personal-index.component.html',
  styleUrls: ['./seller-personal-index.component.scss']
})
export class SellerPersonalIndexComponent implements OnInit {

  params;
  baseInfo;
  recentOrder;
  sellerInfo;
  constructor(public route: ActivatedRoute,
              private router: Router,
              private business: BusinessService,
              public http: HttpClientService,
              private orderService: OrderService) { }

  ngOnInit() {
    this.load()
  };

  load() {
    this.route.queryParams.subscribe(params => {
      this.params = Object.assign(
        {
          page: params['page'],
          pageSize: 3,
        });
      this.info();
      this.orderList();
      this.getSellerInfo();
    });
  }

  /**
   * 最近订单列表
   */
  orderList() {
    this.orderService.getSellerOrder(this.params).subscribe(res => {
      this.recentOrder = res['items'];
    });
  }

  // 获取当前登录卖家信息
  getSellerInfo() {
    const params = {'expand': 'shop,profile,demands'};
    this.business.getBusiness(params).subscribe(
      res => {
        this.sellerInfo = res;
      }
    )
  }

  /**
   * 获取个人头像以及昵称信息
   */
  public info() {
    this.http.version = Config.mainApiBusiness;
    this.business.getSingleInfo({}).subscribe(
      res => {
        this.baseInfo = res;
      }
    )
  }

  // 我的服务tab高亮显示
  goodsEvren(){
    this.router.navigate(['/seller/personal/index/goods'], {
      queryParams: {is_down: ''}
    });
  }

  // 订单管理tab高亮显示
  orderEven() {
    this.router.navigate(['/seller/personal/index/order'], {
      queryParams: {type: ''}
    });
  }
}
