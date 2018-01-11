import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../service/local-storage.service';
import {BusinessService} from '../../service/business.service';
import {CompanyService} from '../../service/company.service';
import {FlashMessagesService} from '../../service/flash-messages.service';

@Component({
  selector: 'app-submit-apply',
  templateUrl: './submit-apply.component.html',
  styleUrls: ['./submit-apply.component.scss']
})

export class SubmitApplyComponent implements OnInit {
  public companyType = this.localStorage.get('companyType');  // 获取本地存储的注册用户的类型 (基金公司、服务商)
  public tipsText = ''; // 提示的文本信息

  constructor(
    private router: Router,
    private localStorage: LocalStorageService,
    private flashMessages: FlashMessagesService,
    private businessService: BusinessService,
    private companyService: CompanyService
  ) { }

  ngOnInit() {
    if (this.companyType === '0') { // 基金公司查看资料
      this.companyService.getCompany().subscribe(
        res => {
          if (res) {
            // user_verify_type：实名认证类型 0未提交资料 1已认证通过 2未通过审核 3等待审核中
            if (res['wallet']['user_verify_type'] === 3) { // 等待审核中
              this.tipsText = '提交开户资料成功，我们将会在2个工作日内给予反馈，请耐心等待~';
            } else {
              this.router.navigate(['/buyer/personal/index/indexs']);
            }
          }
        },
        error => {
          if (error === '账号或密码错误，请重输入') {
            this.router.navigate(['/site/home']);
          } else {
            this.flashMessages.wechatprompt(error);
          }
        }
      )
    } else if (this.companyType === '1') {  // 服务商
      this.businessService.getBusiness().subscribe(
        res => {
          if (res) {
            // user_verify_type：实名认证类型 0未提交资料 1已认证通过 2未通过审核 3等待审核中
            if (res['user_verify_type'] < 3) {  // 钱包开户
              // this.router.navigate(['/shop/applicationservice']);
              this.router.navigate(['/seller/personal/index/indexs']);
            } else {
              this.tipsText = '提交商家申请成功，我们将会在2个工作日内联系您，请耐心等待 ~';
            }
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
  }

  // 提交申请成功，跳转到申请状态的页面
  submitSuccess() {
    if (this.companyType === '0') {  // 基金公司
      this.router.navigate(['/buyer/personal/index/indexs']);
    } else if (this.companyType === '1') {  // 服务商
      this.router.navigate(['/seller/personal/index/indexs']);
    }
  }
}

