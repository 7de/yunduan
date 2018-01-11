import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShopShowService} from '../../../../service/shop-show.service';
import {Config} from '../../../../config/config';
import {HttpClientService} from '../../../../service/http-client.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  goodsListPagination: any;
  searchType = 'goods';

  images: any[];
  playImg = false;

  public storeIndex; // 店铺详情数据
  // public videoUrl; // videos
  public goodsList; // 商品列表详情
  public commentsData; // 评价列表
  public pagination;

  public shopId = this.route.snapshot.queryParams['shopId'];
  params;
  public grades = false;
  public prices = false;
  public services = false;
  public score: Boolean;
  public priced: Boolean;
  public serviced: Boolean;
  show;

  qqFirst = 'tencent://message/?v=3&amp;uin=';
  qqLast = '&amp;site=qq&amp;menu=yes';

  constructor(private route: ActivatedRoute,
              private shopShowService: ShopShowService,
              public router: Router,
              protected http: HttpClientService) {
  }

  ngOnInit() {
    this.load();
    this.getStoreMessage({shop_id: this.shopId});
    window.scrollTo(0, 0);
  }

  load() {
    this.route
      .queryParams
      .subscribe(params => {
        this.params = {page: params['page']};

        if (this.searchType === 'goods' || params['keyword']) {
          this.getShopList(Object.assign({}, this.params, {sort: params['sort'], title: params['keyword']}));
          this.index();
          window.scrollTo(0, 670); // 定位到商品列表位置
        } else {
          this.getShopList({sort: params['sort']});
          this.index(this.params);
          window.scrollTo(0, 1750); // 定位到评论位置
        }
      });
  }

  /**
   * 初始化加载 评论数据
   * @param params
   */
  index(params?) {
    this.shopShowService.getCommentsList(Object.assign({'shop_id': this.shopId, pageSize: 5}, params)).subscribe(
      res => {
        this.commentsData = res['items'];
        this.pagination = res['_meta'];
      });
  }

/*  /!**
   * 播放视频
   * @param video
   *!/
  playVideo(video) {
    if (video.paused) {
      video.load();
      this.playImg = true;
    } else {
      video.pause();
      this.playImg = false;
    }
    video.addEventListener('ended', () => {
      this.playImg = false;
    })
  }*/

  /**
   * 分页操作数据
   * @param e
   * @param searchType
   */
  paginate(e, searchType) {
    this.searchType = searchType;
    this.router.navigate([this.router.url.split('?')[0]], {
      queryParams: {page: e.page + 1},
      queryParamsHandling: 'merge'
    });
  }

  /**
   * 获取店铺基本信息
   */
  getStoreMessage(params) {
    this.shopShowService.getStoreDetails(params, this.shopId).subscribe(
      res => {
        this.storeIndex = res;
        this.getPicture(this.storeIndex.photos);
        // this.videoUrl = Config.apiDomain + res['video_url'];
      });
  }


  /**
   * 评分 价格 服务数量的降序

   获取店铺所有商品的列表
   */
  getShopList(params) {
    Object.assign(params, {expand: 'shop', shop_id: this.shopId, pageSize: 10});
    this.shopShowService.getAllGoods(params).subscribe(
      res => {
        this.goodsList = res['items'] || '';
        this.goodsListPagination = res['_meta'];
      });
  }


  /**
   * 评分降序
   */
  grade() {
    this.router.navigate([this.router.url.split('?')[0]], {
      queryParams: {sort: '-score', page: 1},
      queryParamsHandling: 'merge'
    });
    this.score = false;
    this.grades = !this.grades;
    this.prices = false;
    this.services = false;
  }

  /**
   * 评分升序
   */
  // gradeUp() {
  //   this.router.navigate([this.router.url.split('?')[0]], {
  //     queryParams: {sort: 'score', page: 1},
  //     queryParamsHandling: 'merge'
  //   });
  //   this.score = true;
  //   this.grades = !this.grades;
  //   this.prices = false;
  //   this.services = false;
  // }

  /**
   * 价格降序
   */
  // price() {
  //   this.router.navigate([this.router.url.split('?')[0]], {
  //     queryParams: {sort: '-price', page: 1},
  //     queryParamsHandling: 'merge'
  //   });
  //   this.priced = true;
  //   this.prices = !this.prices;
  //   this.grades = false;
  //   this.services = false;
  // }

  /**
   * 服务数量降序
   */
  service() {
    this.router.navigate([this.router.url.split('?')[0]], {
      queryParams: {sort: '-sales_num', page: 1},
      queryParamsHandling: 'merge'
    });
    this.serviced = false;
    this.services = !this.services;
    this.grades = false;
    this.prices = false;
  }

  /**
   * 服务数量升序
   */
  // serviceUp() {
  //   this.router.navigate([this.router.url.split('?')[0]], {
  //     queryParams: {sort: 'sales_num', page: 1},
  //     queryParamsHandling: 'merge'
  //   });
  //   this.serviced = true;
  //   this.services = !this.services;
  //   this.grades = false;
  //   this.prices = false;
  // }

  /**
   * 价格升序
   */
  // priceUp() {
  //   this.router.navigate([this.router.url.split('?')[0]], {
  //     queryParams: {sort: 'price', page: 1},
  //     queryParamsHandling: 'merge'
  //   });
  //   this.priced = true;
  //   this.prices = !this.prices;
  //   this.grades = false;
  //   this.services = false;
  // }


  /**
   * 获取轮播图片
   */
  getPicture(picAry) {
    this.images = [];
    for (let i = 0; i < picAry.length; i++) {
      this.images.push({source: Config.imageDomain + picAry[i].image, alt: '', title: '',width:'1200',height:'360'});
    }
  }

  /**
   * 处理评级别
   *
   * @param score  传入评分值
   * @return
   */
  getScores(score) {
    let scoreFloat = score.toString().split('.');
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
   * windows距离top移动的距离
   */
  @HostListener('window:scroll', [])
  onWindowScroll() {

    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number > 300) {
      this.show = true;
    } else {
      this.show = false;
    }

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
