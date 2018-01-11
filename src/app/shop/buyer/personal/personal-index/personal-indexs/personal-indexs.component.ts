import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {VideoService} from '#{service}/lives/video.service';
import {FundCompanyService} from '#{service}/fund-company.service';
import {CompanyService} from '#{service}/company.service';
import {HttpClientService} from '#{service}/http-client.service';
import {OrderService} from '#{service}/order.service';
import {Config} from '#{config}/config';
import {EstimateService} from '#{service}/estimate.service';

@Component({
  selector: 'app-personal-indexs',
  templateUrl: './personal-indexs.component.html',
  styleUrls: ['./personal-indexs.component.scss']
})
export class PersonalIndexsComponent implements OnInit {

  params;
  baseInfo;
  recentOrder;
  buyerInfo;
  classInfo;
  // display;
  constructor(
    public route: ActivatedRoute,
    public fundCompany: FundCompanyService,
    public company: CompanyService,
    public http: HttpClientService,
    public order: OrderService,
    public video: VideoService,
  ) {
  }

  ngOnInit() {
    this.load();
  };

  load() {
    this.route.queryParams.subscribe(params => {
      this.params = Object.assign(
        {
          page: params['page'],
          pageSize: 3,
        }
      );
      this.info();
      this.getBuyerInfo();
      this.recentOrderList();
      this.getClassInfo();
    })
  };


  /**
   * 获取当前登录基金公司信息
   */
  getBuyerInfo() {
    this.company.getCompany().subscribe(
      res => {
        this.buyerInfo = res;
        // if (res['is_guided'] == 0) {
        //   this.display = true;
        //   document.querySelector('html').style.overflow = 'hidden';
        //   this.company.getPassGuide().subscribe(
        //     result => {
        //     }
        //   );
        // } else {
        //   this.display = false;
        // }
      }
    )
  }

  /**
   * 获取买家头像/昵称信息
   */
  public info() {
    this.http.version = Config.mainApiVersion;
    this.fundCompany.getFundCompanyInfo({}).subscribe(
      res => {
        this.baseInfo = res;
      }
    )
  }

  // 获取最近订单列表
  recentOrderList() {
    this.order.getOrder({pageSize: 3}).subscribe(
      res => {
        this.recentOrder = res['items'];
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
