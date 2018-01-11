import {Component, OnInit} from '@angular/core';
import {Config} from '#{config}/config';
import {Router} from '@angular/router';
import {LocalStorageService} from '#{service}/local-storage.service';
import {SiteService} from '#{service}/site.service';
import {ShopShowService} from '#{service}/shop-show.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  titleUrl: any;
  images: any;
  partner: any;
  bannerImd: any;
  result;
  public Array = [];
  carousels = [];
  carouselShowKey = 0;
  serviceType;
  newsInfoHYDT;
  newsInfoHGZY;
  newsInfoSMGH;
  imageDomain: string = Config.imageDomain;

  constructor(private siteService: SiteService,
              protected router: Router,
              private shopShowService: ShopShowService,
              protected localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    this.images = this.images || [];
    this.banner({});
    this.partnerIndex({});
    this.serviceTypeFn();
    this.newsInfo();
    this.newsInfo2();
    this.newsInfo3();
    window.scrollTo(0, 0);
  }

  prev() {
    if (this.carouselShowKey === 0) {
      this.carouselShowKey = 0;
    } else {
      this.carouselShowKey--;
    }
  }

  next() {
    if (this.carouselShowKey === 0) {
      this.carouselShowKey = 0;
    }
    if (this.carouselShowKey + 1 === (Math.floor((this.partner.length + 1) / 8))) {
      this.carouselShowKey = Math.floor((this.partner.length + 1) / 8) - 1;
    } else {
      this.carouselShowKey++;
    }

  }

  /**
   * banner轮播图
   * @param params
   */
  banner(params) {
    this.siteService.bannerList(params, {}).subscribe(
      res => {
        this.bannerImd = res;
        this.getPicture(this.bannerImd);
      }
    )
  }


  /**
   * 合作伙伴图片
   * @param params
   */
  partnerIndex(params) {
    this.siteService.partnerList(params, {}).subscribe(
      res => {
        this.result = res;
        this.partner = this.result;
        for (let i = 0; i < this.partner.length; i++) {
          const key = Math.ceil((i + 1) / 8) - 1;
          this.carousels[key] = this.carousels[key] || [];
          this.carousels[key].push({source: this.partner[i].pic, alt: '您的专属服务团队', link: '#'});
        }
      });
  }

  /**
   * 获取轮播图片
   */
  getPicture(picAry) {
    this.images = [];
    for (let i = 0; i < picAry.length; i++) {
      this.images.push({
        source: Config.imageDomain + picAry[i].img_path, title: ''
      });
    }
  }

  onImageUrl(event, banner) {
    for (let k in banner) {
      if (banner.hasOwnProperty(k)) {
        this.titleUrl = banner[k].img_url;
        this.Array.push(this.titleUrl);
      }
    }
    if (this.Array[event.index] === '') {
      return false;
    }
    if (!this.Array[event.index] === false) {
      window.open(this.Array[event.index]);
    }
  }

  /**
   * 获取云集优服所有的类型
   *
   */
  serviceTypeFn() {
    this.shopShowService.getAllService({}).subscribe(
      res => {
        this.serviceType = res;
      })
  }

  /*
  * 行业动态
  * */
  newsInfo(){
    this.siteService.newsList({
      pageSize:1,
      category_id: 4
    }, {}).subscribe(
      res => {
        this.newsInfoHYDT = res['items'];      }
    )
  }

  /*
  * 合规指引
  * */
  newsInfo2(){
    this.siteService.newsList({
      pageSize:2,
      category_id: 3
    }, {}).subscribe(
      res => {
        this.newsInfoHGZY = res['items']
      }
    )
  }
  /*
  * 私募干货
  * */
  newsInfo3(){
    this.siteService.newsList({
      pageSize:3,
      category_id: 1
    }, {}).subscribe(
      res => {
        this.newsInfoSMGH = res['items']
      }
    )
  }
}
