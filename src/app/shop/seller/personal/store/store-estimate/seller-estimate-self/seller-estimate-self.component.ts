import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {BusinessService} from '#{service}/business.service';
import {EstimateService} from '#{service}/estimate.service';
import {Config} from '#{config}/config';

@Component({
  selector: 'app-seller-estimate-self',
  templateUrl: './seller-estimate-self.component.html',
  styleUrls: ['./seller-estimate-self.component.scss']
})
export class SellerEstimateSelfComponent implements OnInit {

  public params;
  public sellerBossList;
  public pagination;
  public estimateForm;
  public sellerInfo;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private estimate: EstimateService,
    private business: BusinessService,) {
    this.pagination = this.pagination || {};
  }

  ngOnInit() {
    this.estimateForm = new FormGroup({
      grade: new FormControl('')
    });
    this.load();
    this.getSellerInfo();
  }

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
          this.sellerBoss()
      })
  }

  // 服务商==我的评价
  sellerBoss() {
    this.estimate.getSellerBoss(this.params).subscribe(
      res => {
        this.sellerBossList = res['items'];
        this.pagination = res['_meta'];
      }
    )
  }

  onChange(form) {
    this.router.navigate(['/seller/personal/index/estimate/self'], {queryParams: {'grade': form.grade}})
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
