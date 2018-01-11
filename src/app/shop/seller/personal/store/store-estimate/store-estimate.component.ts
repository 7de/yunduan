import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {BusinessService} from '#{service}/business.service';
import {HttpClientService} from '#{service}/http-client.service';
import {ShopService} from '#{service}/shop.service';
import {EstimateService} from '#{service}/estimate.service';
import {FlashMessagesService} from '#{service}/flash-messages.service';
import {Config} from '#{config}/config';
import {ValidDetails} from '#{common}/shared/validator';
@Component({
  selector: 'app-store-estimate',
  templateUrl: './store-estimate.component.html',
  styleUrls: ['./store-estimate.component.scss']
})
export class StoreEstimateComponent implements OnInit {
  val1: number;
  val2: number;
  val3: number;
  public onOff = false;
  public pagination;
  public scoreList;
  public storeEvaluationStatus;
  public storeEvaluationList;
  public imgurl;
  params;
  form;
  orderId;
  descriptionLength = 200;
  sellerInfo;
  tabClassName = 'custom-tabs-another custom-tabs-sub_another';
  // 服务商===我的评价
  public tabItems = [{title: '我的评价', url: './self'} , {title: '来自需求方的评价', url: './other'}];

  constructor(
    public http: HttpClientService,
    private shopService: ShopService,
    private estimateService: EstimateService,
    public route: ActivatedRoute,
    public router: Router,
    public flashMessages: FlashMessagesService,
    private business: BusinessService,
  ) {
    this.pagination = this.pagination || {};
  }

  ngOnInit() {
    this.imgurl = Config.apiDomain;
    this.form = new FormGroup({
      reply: new FormControl('', [ValidDetails])
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
        // this.buyersEvaluationList();  // 买家评价列表
        this.storeEvaluation(180);    // 店铺半年的评价情况
        this.show();  // 商家累计半年的好中差评
        this.getSellerInfo();
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

  // 店铺半年的评价情况
  storeEvaluation(day) {
    this.shopService.getShopStars({}, day).subscribe(
      res => {
        this.storeEvaluationStatus = res;
        this.val1 = Math.round(this.storeEvaluationStatus.service[0] / 10);
        this.val2 = Math.round(this.storeEvaluationStatus.work[0] / 10);
        this.val3 = Math.round(this.storeEvaluationStatus.quality[0] / 10);
      },
      error => {
      }
    );
  }

  cal(a) {
    return Math.round(a);
  }

  // 商家累计半年的好中差评
  show() {
    this.shopService.getShopScores().subscribe(
      res => {
        this.scoreList = res;
      },
      error => {}
    );
  }

  // 来自买家的评价
  // buyersEvaluationList() {
  //   this.estimateService.getBuyerBoss(this.params).subscribe(
  //     res => {
  //       this.storeEvaluationList = res['items'];
  //       this.pagination  = res['_meta'];
  //     },
  //     error => {}
  //   );
  // }

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
   * 获取服务商账号登陆信息
   */
  getSellerInfo() {
    const params = {'expand': 'shop,profile,demands,wallet'};
    this.business.getBusiness(params).subscribe(
      res => {
        this.sellerInfo = res;
      })
  }
}
