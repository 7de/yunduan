import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidatePassword, ValidOldPassword} from '#{common}/shared/validator';
import {FacilitatorService} from '#{service}/facilitator.service';
import {FlashMessagesService} from '#{service}/flash-messages.service';
import {CompanyService} from '#{service}/company.service';
import {LocalStorageService} from '#{service}/local-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-password-login-modify',
  templateUrl: './password-login-modify.component.html',
  styleUrls: ['./password-login-modify.component.scss']
})
export class PasswordLoginModifyComponent implements OnInit {

  public form;
  companyType = this.localStorage.get('companyType');
  constructor(
    private facilitator: FacilitatorService,
    public flashMessages: FlashMessagesService,
    public formBuilder: FormBuilder,
    private companyService: CompanyService,
    private facilitatorService: FacilitatorService,
    public localStorage: LocalStorageService,
    public router: Router
    ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      old_pass: ['', [Validators.required]],
      new_pass: ['', [ValidatePassword]],
      repeat_password: ['', [ValidOldPassword]]
    }, { validator: this.matchingPasswords('new_pass', 'repeat_password') })
  }

  /**
   * 密码重复验证
   * @param {string} passwordKey
   * @param {string} passwordConfirmationKey
   * @returns {(group: FormGroup) => void}
   */
  matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey]
      let passwordConfirmationInput = group.controls[passwordConfirmationKey]
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true })
      }
    }
  }

  onSubmit(form) {
    if (!form.valid) {
      return false;
    }

    this.facilitator.passwordModify({
      'old_pass': form.value.old_pass,
      'new_pass': form.value.new_pass
    }).subscribe(
      result => {
        this.flashMessages.wechatprompt('修改成功');
        setTimeout( () => {
          this.logout()
        }, 2000)
      }, err => {
        this.flashMessages.wechatprompt(err);
      })
  }

  /**
   *  退出账户
   */
  logout() {
    if (this.companyType == '0') { // 基金公司
      this.companyService.logout();
    } else if (this.companyType == '1') { // 第三方服务商
      this.facilitatorService.logout();
    }
    this.router.navigateByUrl('/login/user-login');
  }

}
