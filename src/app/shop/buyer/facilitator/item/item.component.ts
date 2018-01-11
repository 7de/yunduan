import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShopService} from '#{service}/shop.service';
import {ShopShowService} from '#{service}/shop-show.service';
import {LocalStorageService} from '#{service}/local-storage.service';
import {FlashMessagesService} from '#{service}/flash-messages.service';
import {Config} from '#{config}/config';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  images;

  public goodsData;

  public shopData;
  public goodsId = this.route.snapshot.queryParams['goodsId'];
  public shopId = this.route.snapshot.queryParams['shopId'];

  public pagination;
  public commentsData;
  public goodsNum = 1;
  params;
  public companyType = this.localStorageService.get('companyType');
  fix;
  description;
  estimate;
  guarantee;
  onOff: Boolean;
  show; // 回到顶部按钮显示与隐藏

  qqFirst = 'tencent://message/?v=3&amp;uin=';
  qqLast = '&amp;site=qq&amp;menu=yes';
  goodsList;

  constructor(private route: ActivatedRoute,
              private getShopInfoService: ShopService,
              private shopShowService: ShopShowService,
              public router: Router,
              private localStorageService: LocalStorageService,
              private flashMessages: FlashMessagesService) {
  }

  ngOnInit() {
    this.onOff = false;
    this.description = true;
    this.images = this.images || [];
    this.getGoodsDetails();
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
          });
        this.getShopComments();
        this.getShopList();
      })
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
  }

  /**
   * 获取商品信息  买家
   */
  getGoodsDetails() {
    this.shopShowService.getShopDetails({}, this.goodsId).subscribe(
      res => {
        this.goodsData = res;
        // console.log(res);
        this.images = res['images'].map((x) => {
          return {source: Config.imageDomain + x, alt: '', title: ''};
        });
        this.getShopInfo();
      });
  }

  /**
   * 添加或者减少商品数量
   * @param num
   * @param type
   */
  changeNum(type) {
    if (this.goodsNum) {
      switch (type) {
        case 'add':
          this.goodsNum++;
          break;
        case 'reduce':
          if (this.goodsNum > 1) {
            this.goodsNum--;
          } else {
            return;
          }
          break;
        default:
          break;
      }
    } else {
      this.goodsNum = 1;
    }
  }

  /**
   * windows距离top移动的距离
   */
  @HostListener('window:scroll', [])
  onWindowScroll() {

    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number > 635) {
      this.fix = true;
    } else {
      this.fix = false;
    };
    if (number > 300) {
      this.show = true;
    } else {
      this.show = false;
    }

  }

  test(idName) {
    document.getElementById(idName).scrollIntoView();
    if ( idName === 'description') {
      this.description = true;
      this.estimate = false;
      this.guarantee = false;
    }else if ( idName === 'estimate' ) {
      this.description = false;
      this.estimate = true;
      this.guarantee = false;
    }else if ( idName === 'guarantee' ) {
      this.description = false;
      this.estimate = false;
      this.guarantee = true;
    }
  }

  /**
   * 获取店铺信息
   * @param shopId
   */
  getShopInfo() {
    this.getShopInfoService.getShopInfo({}, this.shopId).subscribe(
      res => {
        this.shopData = res;
        // console.log(res);
      });
  }

  /**
   * 获取本商品评价
   * @param shopId
   * @param goodsId
   */
  getShopComments() {
    const params = Object.assign({'shop_id': this.shopId, 'goods_id': this.goodsId}, this.params);
    this.shopShowService.getCommentsList(params).subscribe(
      res => {
        this.commentsData = res['items'];
        // console.log(this.commentsData);
        this.pagination = res['_meta'];
      }
    );
  }

  /**
   * 处理评级别
   *
   * @param score  传入评分值
   * @return
   */
  getScores(score) {
    let scoreFloat = String(score).split('.');
    if (scoreFloat.length > 1) {
      if (Number(scoreFloat[1]) > 5) {
        scoreFloat[1] = '9';
      } else if (Number(scoreFloat[1]) > 0 && Number(scoreFloat[1]) < 5) {
        scoreFloat[1] = '5';
      }
    }
    return Number(scoreFloat.join('.'));
  }

  /**
   * 立即购买
   */
  buyNow() {
    window.scroll(0, 0)
    if (this.companyType === '0') { // 买家才能购买
      this.router.navigate(['/buyer/facilitator/submission'], {
        queryParams: {
          goodsId: this.goodsId,
          num: this.goodsNum
        }
      });
    } else if (this.companyType === '1') {
      this.flashMessages.wechatprompt('您的账号是服务商，不能购买');
    } else {
      this.flashMessages.wechatprompt('请先登入后再购买');
    }
  }

  /**
   * 评分 价格 服务数量的降序

   获取店铺所有商品的列表
   */
  getShopList() {
    const params = Object.assign({expand: 'shop', shop_id: this.shopId, pageSize: 5});
    this.shopShowService.getAllGoods(params).subscribe(
      res => {
        this.goodsList = res['items'];
        // console.log(this.goodsList);
      });
  }

  handle(name) {
    let fixName = name + '';
    if (fixName.length >= 4) {
      let subStr1 = fixName.substr(0, 1);
      let subStr2 = fixName.substr(fixName.length - 1, 1);
      let subStr = subStr1 + '***' + subStr2 ;
      return subStr;
    }else {
      return name;
    }

  }
}
