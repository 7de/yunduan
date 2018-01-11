import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BusinessService} from '#{service}/business.service';
import {HttpClientService} from '#{service}/http-client.service';
import {OrderService} from '#{service}/order.service';
import {ShopService} from '#{service}/shop.service';
import {Config} from '#{config}/config';
import {VideoService} from '#{service}/lives/video.service';

@Component({
  selector: 'app-seller-personal-indexs',
  templateUrl: './seller-personal-indexs.component.html',
  styleUrls: ['./seller-personal-indexs.component.scss']
})
export class SellerPersonalIndexsComponent implements OnInit {
  params;
  baseInfo;
  recentOrder;
  sellerInfo;
  shopInfo;
  classInfo;
  display: Boolean;
  order: number;
  isIe;
  constructor(
    public route: ActivatedRoute,
    private business: BusinessService,
    public http: HttpClientService,
    private orderService: OrderService,
    private shop: ShopService,
    public video: VideoService,
  ) {
  }
  ngOnInit() {
    this.load();
    this.display = true;
    this.order = 1;
  };

  orders() {
    this.order = 2;
  }
  closeModal() {
    this.display = false;
    // y轴可以重新滚动
    document.querySelector('html').style['overflow-y'] = 'auto';
  }
  load() {
    this.route.queryParams.subscribe(params => {
      this.params = Object.assign({
        page: params['page'],
        pageSize: 3,
      });
      this.getSellerInfo();
      this.getShopInfo();
      this.getClassInfo();
    })
  };

  /**
   * 最近订单列表
   */
  orderList() {
    this.orderService.getSellerOrder(this.params).subscribe(res => {
      this.recentOrder = res['items'];
    });
  }

  // 判断是否为ie||360急速模式
  isIePlayer() {
    if (('ActiveXObject' in window)) {
      this.isIe = true;
    }
  }

  /**
   * 获取服务商账号登陆信息
   */
  getSellerInfo() {
    const params = {'expand': 'shop,profile,demands,wallet'};
    this.business.getBusiness(params).subscribe(
      res => {
        this.sellerInfo = res;
        // 当没有点击完成认证以及没有进行过引导时，显示遮罩层引导，并限制y轴滚动
        if (res['is_finish_check'] == 1 && res['is_guided'] == 0) {
          this.display = true;
          this.isIePlayer();
          document.querySelector('html').style.overflow = 'hidden';
        }
        // 如果已点击完成认证发送指引完成请求，以及显示开通店铺指引
        if (res['is_finish_check'] == 1) {
          this.order = 1;
          this.passGuide();
        }
        // 店铺资料未填写时,不请求数据
        if (res['shop'] != null) {
          this.orderList();
        }
      }
    )
  }

  /**
   * 获取店铺信息
   */
  getShopInfo() {
    this.shop.getLoginShopInfo({}).subscribe(
      res => {
        this.shopInfo = res;
      }
    )
  }

  /**
   * 完成指引操作  请勿删除！！！
   */
  passGuide() {
    this.business.getPassGuide().subscribe(
      res => {
      }
    )
  }

  /**
   * 完成点击的按钮事件
   */
  completes() {
    this.shop.completeAuth().subscribe(
      res => {
        setTimeout(function() {
          window.location.reload();
        }, 200);
        this.order = 1;
      }
    )
  }

  /**
   * 获取我的课堂信息
   */
  getClassInfo() {
    this.video.getMyLivesInfo().subscribe(
      res => {
        this.classInfo = res;
      }
    )
  }
}
