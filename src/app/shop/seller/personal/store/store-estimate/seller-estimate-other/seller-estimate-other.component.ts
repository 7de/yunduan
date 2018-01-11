import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {BusinessService} from '#{service}/business.service';
import {EstimateService} from '#{service}/estimate.service';
import {FlashMessagesService} from '#{service}/flash-messages.service';
import {LocalStorageService} from '#{service}/local-storage.service';
import {ValidDetails} from '#{common}/shared/validator';
import {Config} from '#{config}/config';

@Component({
  selector: 'app-seller-estimate-other',
  templateUrl: './seller-estimate-other.component.html',
  styleUrls: ['./seller-estimate-other.component.scss']
})
export class SellerEstimateOtherComponent implements OnInit {

  public params;     // 参数
  public buyerBossList;
  public pagination; //  页码
  public onOff = false;
  public currentReplying; // 当前回复
  public orderId;    // 订单id
  public form;
  public descriptionLength = 200;
  public estimateForm;
  public sellerInfo;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private estimate: EstimateService,
    private flashMessages: FlashMessagesService,
    public localstorage: LocalStorageService,
    private business: BusinessService,) {
    this.pagination = this.pagination || {};
  };

  ngOnInit() {
    this.form = new FormGroup({
      reply: new FormControl('', [ValidDetails])
    });
    this.estimateForm = new FormGroup({
      grade: new FormControl('')
    });
    this.load();
  };

  load() {
    this.route
      .queryParams
      .subscribe(params => {
        this.params = Object.assign(
          {
            page: params['page'],
            pageSize: Config.pageSize,
            grade: params['grade']
          }
        );
        this.buyerBoss();
        this.getSellerInfo();
      })
  };
  // 服务商===买家的评价
  buyerBoss() {
    this.estimate.getBuyerBoss(this.params).subscribe(
      res => {
        this.buyerBossList = res['items'];
        this.pagination = res['_meta'];
      }
    )
  };

  showReply(id) {
    this.orderId = id;
    this.onOff = !this.onOff;
    this.currentReplying = this.orderId;
  };

  onKeyup(event) {
    this.descriptionLength = 200 - (event.target.value.length);
  };

  onSubmit(form) {
    if (!form.valid) {
      return false;
    }
    const params = Object.assign({
      'comment_id': this.orderId,
      'content': form.value.reply
    });
    this.estimate.replyToBuyer(params).subscribe(
      res => {
        this.cancel();
        this.flashMessages.wechatprompt('回复成功！');
        this.load();
      }
    )
  }

  cancel() {
    this.onOff = false;
    this.form.reset();
    this.descriptionLength = 200;
  };

  onChange(form) {
    this.router.navigate(['/seller/personal/index/estimate/other'], {queryParams: {'grade': form.grade}})
  }

  /**
   * 分页操作数据
   * @param e
   */
  paginate(e) {
    this.router.navigate([this.router.url.split('?')[0]], {
      queryParams: {
        'page': e.page + 1
      },
      queryParamsHandling: 'merge'
    });
    window.scroll(0, 0)
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
