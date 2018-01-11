import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClientService} from '../../service/http-client.service';
import {LocalStorageService} from '../../service/local-storage.service';
import {BusinessService} from '../../service/business.service';
import {MailService} from '../../service/mail.service';
import {FlashMessagesService} from '../../service/flash-messages.service';

@Component({
  selector: 'app-application-service',
  templateUrl: './application-service.component.html',
  styleUrls: ['./application-service.component.scss']
})
export class ApplicationServiceComponent implements OnInit {
  public proveStatus = 0;       // 资质证明申请状态
  public openAccountStatus = 0; // 钱包开户申请状态
  public applystatus;  // 页面title显示申请的状态
  sellerMail; // 卖家系统消息
  buyerMail;  // 买家系统消息

  companyType = this.localstorage.get('companyType');
  constructor(
    private router: Router,
    public http: HttpClientService,
    private flashMessages: FlashMessagesService,
    public localstorage: LocalStorageService,
    public businessService: BusinessService,
    private mail: MailService) {
  }

  ngOnInit() {
    this.accountType(); // 账号类型
    if (this.companyType === '0') {
      this.buyerMessage();
    }else if (this.companyType === '1') {
      this.sellerMessage();
    }

  }

  // 卖家系统消息
  sellerMessage() {
    const params = {notice_type: 0};
    this.mail.getSellerMail(params).subscribe(res => {
      this.sellerMail = res['items'];
    });
  }

  // 买家系统消息
  buyerMessage() {
    const params = {notice_type: 0};
    this.mail.getBuyerMail(params).subscribe(res => {
      this.buyerMail = res['items'];
    });
  }

  /**
   * 获取账号类型
   */
  accountType() {
    let account = this.localstorage.get('companyType');
    if (account === '0') { // 基金公司
      this.router.navigate(['/buyer/personal/index']);
    } else if (account === '1') {
      this.applyStatus(); // 开户和资质证明的状态 (服务商)
    }
  }

  /**
   * 资质证明和钱包开户的状态 (服务商)
   */
  applyStatus() {
    // 发送请求
    this.businessService.getBusiness().subscribe(
      res => {
        if (res) {
          // 实名认证类型 0未提交资料 1已认证通过 2未通过审核 3等待审核中
          if (res['user_verify_type'] === 0 && res['info_verify_type'] === 0) {
            this.applystatus = 0;
          } else if (res['info_verify_type'] === 2) {
            this.applystatus = 2;
          } else if (res['user_verify_type'] === 2) {
            this.applystatus = 2;
          } else if (res['user_verify_type'] === 1 && res['info_verify_type'] === 1) {
            this.applystatus = 1;
            this.router.navigate(['/shop/step/step']);
          } else {
            this.applystatus = 3;
          }
          this.proveStatus = res['info_verify_type'];
          this.openAccountStatus = res['user_verify_type'];
        }
      },
      error => {
        if (error === '账号或密码错误，请重输入') {
          this.router.navigate(['/site/home']);
        } else {
          this.flashMessages.wechatprompt(error);
        }
      }
    );
  }

  /**
   * 资质证明 (链接)
   */
  aptitudeProve() {
    if (this.proveStatus !== 1) {
      this.router.navigate(['/shop/realnameauth']);
    }
  }

  /**
   * 钱包开户 (链接)
   */
  walletAccount() {
    if (this.openAccountStatus !== 1) {
      this.router.navigate(['/shop/wallet']);
    }
  }
}
