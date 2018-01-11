import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShopShowService} from '../../service/shop-show.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ValidateNum2} from '../../common/shared/validator';


@Component({
  selector: 'app-shop-index',
  templateUrl: './shop-index.component.html',
  styleUrls: ['./shop-index.component.scss']
})
export class ShopIndexComponent implements OnInit {
  public Array = [];
  public ArrayMark = [];
  titleMask: any;
  titleText: any;
  titleId: any;
  result;
  typeItems: any;
  title;
  goodsList;
  pagination;
  parameter;
  public grades = false;
  public prices = false;
  public services = false;
  public kind;
  public score: Boolean;
  public priced: Boolean;
  public serviced: Boolean;
  show;

  sortParam;
  priceMin;
  priceMax;
  priceError: Boolean = false;

  constructor(private router: Router,
              private shopShowService: ShopShowService,
              private route: ActivatedRoute) {
    this.pagination = this.pagination || {};
  }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        if (!params['sort']) {
          this.grades = false;
          this.prices = false;
          this.services = false;
        }
        this.index({
          demand_category_id: params['demand_category_id'],
          title: params['keyword'] || '',
          sort: params['sort'],
          price_min: params['price_min'] || '',
          price_max: params['price_max'] || '',
          page: params['page']
        });
        this.titleId = params['demand_category_id'];
        this.sortParam = params['sort'] || '';
      });
    this.type({});

    window.scrollTo(0, 0);
  }


  /**
   * 获取商品列表页
   * @param params
   */
  index(params) {
    this.shopShowService.getAllGoods(Object.assign(params, {
      pageSize: 15, expand: 'shop'
    })).subscribe(
      res => {
        this.goodsList = res['items'];
        this.pagination = res['_meta'];
      }
    )
  }

  /**
   * 获取所有的类型
   * @param params
   */
  type(params) {
    this.shopShowService.getAllService(params).subscribe(
      res => {
        this.typeItems = res;
        for (let k in this.typeItems) {
          if (this.typeItems.hasOwnProperty(k)) {
            this.titleText = this.typeItems[k].title;
            this.Array.push(this.titleText);
            this.titleMask = this.typeItems[k].mark;
            this.ArrayMark.push(this.titleMask)
          }
        }
      }
    )
  }

  /**
   *
   * 价格搜索
   */
  submitPrice() {
    this.priceError = false;
    // if (!this.priceMin || !this.priceMax) {
    //   return this.priceError = true;
    // }
    if (this.priceMin || this.priceMax) {
      if (!this.priceMin.match(/^\d+(\.\d{0,2})?$|^\+?[1-9][0-9]*$/) || !this.priceMax.match(/^\d+(\.\d{0,2})?$|^\+?[1-9][0-9]*$/)) {
        return this.priceError = true;
      }
    }

    this.router.navigate(['/shop/index'], {
      queryParams: {
        price_min: this.priceMin || '',
        price_max: this.priceMax || ''
      },
      queryParamsHandling: 'merge'
    })
  }

  /**
   * 清空
   */
  clearPrice() {
    this.priceMin = null;
    this.priceMax = null;
    this.priceError = false;
  }

  /*
    /!**
     * 评分降序
     *!/
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

    /!**
     * 评分升序
     *!/
    gradeUp() {
      this.router.navigate([this.router.url.split('?')[0]], {
        queryParams: {sort: 'score', page: 1},
        queryParamsHandling: 'merge'
      });
      this.score = true;
      this.grades = !this.grades;
      this.prices = false;
      this.services = false;
    }
  */

  /**
   * 价格降序
   */
  price() {
    this.router.navigate([this.router.url.split('?')[0]], {
      queryParams: {sort: '-price', page: 1},
      queryParamsHandling: 'merge'
    });
    this.priced = false;
    this.prices = !this.prices;
    this.grades = false;
    this.services = false;
  }

  /**
   * 价格升序
   */
  priceUp() {
    this.router.navigate([this.router.url.split('?')[0]], {
      queryParams: {sort: 'price', page: 1},
      queryParamsHandling: 'merge'
    });
    this.priced = true;
    this.prices = !this.prices;
    this.grades = false;
    this.services = false;
  }

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
  serviceUp() {
    this.router.navigate([this.router.url.split('?')[0]], {
      queryParams: {sort: 'sales_num', page: 1},
      queryParamsHandling: 'merge'
    });
    this.serviced = true;
    this.services = !this.services;
    this.grades = false;
    this.prices = false;
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
    window.scrollTo(0, 0);
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
}
