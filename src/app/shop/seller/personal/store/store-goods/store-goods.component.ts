import {Component, OnInit} from '@angular/core';
import {GoodsService} from '#{service}/goods.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Config} from '#{config}/config';
import {FlashMessagesService} from '#{service}/flash-messages.service';
import {FormControl, FormGroup} from '@angular/forms';
import {DatetimeHelper} from '#{common}/helper/datetime-helper';
import {ShopShowService} from '#{service}/shop-show.service';
import {BusinessService} from '#{service}/business.service';

@Component({
  selector: 'app-store-goods',
  templateUrl: './store-goods.component.html',
  styleUrls: ['./store-goods.component.scss']
})
export class StoreGoodsComponent implements OnInit {
  data;
  pagination;
  form;
  cn: object;
  serviceData; // 服务类型
  serviceInfoData; // 当前服务商信息

  shopDialog = 'shop-dialog'; // 弹框class名
  goodsDialogShow: Boolean = false; // 上/下架弹框
  goodsDialogTitle;
  goodsDialogType;
  goodsDialogId;
  noReleaseShow: Boolean = false; // 未认证弹框

  typeParam = this.route.snapshot.queryParams['is_down'];

  tabClassName = 'custom-tabs-another custom-tabs-sub_another';
  public tabItems = [
    {title: '全部', url: '/seller/personal/index/goods', queryParams: {'is_down': ''}},
    {title: '已上架', url: '/seller/personal/index/goods', queryParams: {'is_down': '1'}},
    {title: '已下架', url: '/seller/personal/index/goods', queryParams: {'is_down': '0'}}
  ];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private flashMessages: FlashMessagesService,
              private goodService: GoodsService,
              private businessService: BusinessService,
              private shopShowService: ShopShowService) {
    this.pagination = this.pagination || {};
  }

  ngOnInit() {
    this.serviceType();
    this.serviceInfo();
    this.cn = Config.calendarLocaleCN;
    this.form = new FormGroup({
      keyword: new FormControl(''),
      demand_category_id: new FormControl(''),
      begin_time: new FormControl(''),
      end_time: new FormControl('')
    });
    this.load();

  }

  /**
   * 初始化
   *
   */
  load() {
    this.route
      .queryParams
      .subscribe(params => {
        this.form.patchValue({
          keyword: params['keyword'] || '',
          demand_category_id: params['demand_category_id'] || '',
          begin_time: params['begin_time'] ? DatetimeHelper.toDate(params['begin_time']) : '',
          end_time: params['end_time'] ? DatetimeHelper.toDate(params['end_time']) : ''
        });
        let param = Object.assign({
          is_down: params['is_down'],
          page: params['page'],
          pageSize: Config.pageSize - 2,
          searchType: 0
        }, this.form.value, {begin_time: params['begin_time'] || '', end_time: params['end_time'] || ''});
        this.goodService.getCenterGoods(param).subscribe(
          res => {
            this.data = res['items'];
            this.pagination = res['_meta'];
          },
          error => {});
        this.typeParam = this.route.snapshot.queryParams['is_down'];
      });
    window.scrollTo(0, 0);

  }

  /**
   * 搜索
   * @param form
   */
  onSubmit(form) {
    this.router.navigate(['/seller/personal/index/goods'], {
      queryParams: {
        keyword: form.keyword ? form.keyword.trim() : '',
        demand_category_id: form.demand_category_id || '',
        begin_time: DatetimeHelper.toTimestamp(form.begin_time) || '',
        end_time: DatetimeHelper.toTimestamp(form.end_time) || '',
      },
      queryParamsHandling: 'merge'
    })
  }

  /**
   * 服务类型
   */
  serviceType() {
    this.shopShowService.getAllService({}).subscribe(
      res => {
        this.serviceData = res;
      },error =>{}
    )
  }

  /**
   * 当前服务商信息
   */
  serviceInfo() {
    this.businessService.getBusiness({
      expand:'shop,wallet'
    }).subscribe(res => {
      this.serviceInfoData = res;
    },error => {
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
    window.scrollTo(0, 0);
  }

  /**
   * 发布服务判断
   */
  releaseFn() {
    if (this.serviceInfoData.info_verify_type !== 1 || !this.serviceInfoData.shop) {
      this.noReleaseShow = true;
      return false
    }
    this.router.navigate(['/seller/personal/increased']);
  }

  /**
   * 上/下架服务
   * @param id 商品id
   * @param title 商品标题
   */
  serviceDialog(id, title, type) {
    this.goodsDialogTitle = title;
    this.goodsDialogId = id;
    this.goodsDialogType = type;
    this.goodsDialogShow = true;
  }

  serviceDialogEven() {
    if (this.goodsDialogType) {
      this.goodService.getUpGoods(this.goodsDialogId).subscribe(res => {
        this.flashMessages.wechatprompt(`<i class="ico-global ico-tip-green"></i><div class="mt-5 text-center">上架成功</div>`);
        this.load();
        this.goodsDialogShow = false;
      }, error => this.flashMessages.wechatprompt('失败：' + error))
    } else {
      this.goodService.getDownGoods(this.goodsDialogId).subscribe(res => {
        this.flashMessages.wechatprompt(`<i class="ico-global ico-tip-green"></i><div class="mt-5 text-center">下架成功</div>`);
        this.load();
        this.goodsDialogShow = false;
      }, error => this.flashMessages.wechatprompt('失败：' + error))
    }
  }


}
