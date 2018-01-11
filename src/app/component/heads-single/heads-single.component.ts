import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { CompanyService } from '#{service}/company.service';
import { FacilitatorService } from '#{service}/facilitator.service';
import { LocalStorageService } from '#{service}/local-storage.service';
import { MailService } from '#{service}/mail.service';
import { BusinessService } from '#{service}/business.service';
import { HttpClientService } from '#{service}/http-client.service';
import {IsLoggedGuard} from '../../guard/is-logged.guard';

@Component({
  selector: 'app-heads-single',
  templateUrl: './heads-single.component.html',
  styleUrls: ['./heads-single.component.scss']
})
export class HeadsSingleComponent implements OnInit, OnDestroy {
  @Input() bgc;
  sellerTimer: Subscription;
  buyerTimer: Subscription;

  show: boolean;
  flag: any;
  result;
  companyType = Cookie.check('currentCompanyAuthorization') ? this.localStorage.get('companyType') : '';
  company: any;
  public text: boolean;
  onOff: boolean;
  upDown: boolean;
  appUpDown: boolean;
  mailNum;
  buyerInfo;
  sellerInfo;
  sellerBaseInfo;

  constructor(
    private router: Router,
    private companyService: CompanyService,
    private facilitatorService: FacilitatorService,
    private localStorage: LocalStorageService,
    private mail: MailService,
    private business: BusinessService,
    public http: HttpClientService,
    public loginGuard: IsLoggedGuard
  ) {
  }

  ngOnInit() {
    this.onOff = false;
    this.users();
  }

  ngOnDestroy() {
    if (this.buyerTimer) {
      this.buyerTimer.unsubscribe();
    }
    if (this.sellerTimer) {
      this.sellerTimer.unsubscribe();
    }
  }

  users() {
    if (this.companyType === '0') { // 基金公司
      this.buyerMessageNum(); // 基金公司获取站内信消息
      this.getBuyerInfo();
    } else if (this.companyType === '1') { // 第三方服务商
      this.getSellerInfo();
      this.sellerMessageNum();  // 服务商获取站内信消息
    }
  }

  orderEven() {
    this.router.navigate(['/shop'], {
      queryParams: { demand_category_id: '1' }
    });
  }

  // 头部信息点击跳转到个人中心消息界面
  message() {
    if (!this.companyType) {
      return this.router.navigate(['/login'])
    } else
      if (this.companyType === '0') {
      return this.router.navigate(['/buyer/personal/message'], { queryParams: { 'notice_type': 0 } })
    } else if (this.companyType === '1') {
      this.router.navigate(['/seller/personal/message'], { queryParams: { 'notice_type': 0 } })
    }
  }

  /**
   *  退出账户
   */
  logout() {
    if (this.companyType === '0') { // 基金公司
      this.companyService.logout();
    } else if (this.companyType === '1') { // 第三方服务商
      this.facilitatorService.logout();
    }
    this.router.navigateByUrl('/login/user-login');
  }

  /**
   * 基金公司和服务商的跳转
   */
  personal() {
    if (!this.companyType) {
      // 如果没有companyType,则跳转至登录页面
      return this.router.navigate(['/login']);
    }
    if (this.companyType === '0') {
      // 基金公司登录点击个人中心去往个人中心页面
      this.router.navigateByUrl('/buyer/personal');
    } else if (this.companyType === '1') {
      this.router.navigateByUrl('/seller/personal/index');
    }
  }

  // 登录判断
  typeCompany() {
    if (this.companyType === '0') { // 基金公司
      this.company = this.localStorage.getObject('currentCompany');
      this.flag = this.company.flag;
      if (this.flag === 0 || this.flag === 3) {
        this.router.navigate(['/main/setting/information']);
      } else {
        this.router.navigate(['/main/index']);
      }

      if (this.flag === 2) {
        // 已填写资料，但未审核通过
        this.router.navigate(['/main/setting/account']);
      }
    }
  }

  /**
   * 基金公司 == 获取站内信未读
   */
  buyerMessageNum() {
    this.buyerTimer = Observable.timer(0, 5000).subscribe(() => {
      if (Cookie.check('currentCompanyAuthorization')) {
        this.mail.getBuyerMailCount({ 'has_read': 0 }).subscribe(
          res => {
            this.mailNum = res;
          }
        )
      }
    })
  }

  /**
   * 服务商==获取站内信未读
   */
  sellerMessageNum() {
    this.sellerTimer = Observable.timer(0, 5000).subscribe(() => {
      if (Cookie.check('currentCompanyAuthorization')) {
        this.mail.getSellerMailCount({ 'has_read': 0 }).subscribe(
          res => {
            this.mailNum = res;
          }
        )
      }
    })
  }

  /**
   * 获取当前买家信息
   */
  getBuyerInfo() {
    this.companyService.getCompany().subscribe(
      res => {
        this.buyerInfo = res;
      }
    )
  }

  /**
   * 获取当前卖家信息
   */
  getSellerInfo() {
    const params = { 'expand': 'shop,profile,demands,wallet' };
    this.business.getBusiness(params).subscribe(
      res => {
        this.sellerInfo = res;
      }
    )
  }


}
