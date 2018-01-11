import { Component, OnInit } from '@angular/core';
import {Config} from '#{config}/config';
import {CompanyService} from '#{service}/company.service';
import {HttpClientService} from '#{service}/http-client.service';
import {PayService} from '#{service}/pay.service';
import {BusinessService} from '#{service}/business.service';
import {LocalStorageService} from '#{service}/local-storage.service';
import {FlashMessagesService} from '#{service}/flash-messages.service';
import {RouterConfigLoader} from '@angular/router/src/router_config_loader';
import {Router} from '@angular/router';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  companyType;
  user;
  userInfo;
  constructor(
    public http: HttpClientService,
    public company: CompanyService,
    private business: BusinessService,
    public localStorage: LocalStorageService,
    public flashMessages: FlashMessagesService,
    public router: Router
  ) {
    this.companyType = this.localStorage.get('companyType')
  }

  ngOnInit() {
    if (this.companyType == 0) {
      this.getBuyerInfo();
      this.user = 'buyer'
    } else if (this.companyType == 1) {
      this.getSellerInfo();
      this.user = 'seller'
    }

  }

  /**
   * 获取买家头像/昵称信息/钱包信息
   */
  public getBuyerInfo() {
    this.http.version = Config.mainApiVersion;
    this.company.getCompany().subscribe(
      res => {
        this.userInfo = res;
      }
    )
  }

  /**
   * 获取卖家家头像/昵称信息/钱包信息
   */
  getSellerInfo() {
    const params = {'expand': 'shop,profile,demands,wallet'};
    this.business.getBusiness(params).subscribe(
      res => {
        this.userInfo = res;
      }
    )
  }

  // 基金公司企业资料审核未通过不能开通钱包判断
  openWallet() {
    // console.log(this.user, this.userInfo);
    if (this.user == 'buyer' && this.userInfo.flag !== 1 ) {
      this.flashMessages.wechatprompt('企业资料审核仍未通过哦~别急嘛！');
    } else {
      this.router.navigate(['/shop/wallet'])
    }
  }

}
