import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from '#{service}/flash-messages.service';
import { FacilitatorService } from '#{service}/facilitator.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ValidatePassword, ValidOldPassword } from '#{common}/shared/validator'
import {Router} from '@angular/router';
import {LocalStorageService} from '#{service}/local-storage.service';
import {CompanyService} from '#{service}/company.service';

@Component({
  selector: 'app-personal-login-modify',
  templateUrl: './personal-login-modify.component.html',
  styleUrls: ['../../../../seller/personal/seller-set/password-login-modify/password-login-modify.component.scss']
})
export class PersonalLoginModifyComponent implements OnInit {

  public form;
  companyType = this.localStorage.get('companyType');
  constructor(
    private formBuilder: FormBuilder,
    private httpService: FacilitatorService,
    public flashMessages: FlashMessagesService,
    public router: Router,
    public localStorage: LocalStorageService,
    private companyService: CompanyService,
    private facilitatorService: FacilitatorService,
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
    if (form.invalid) {
      return false
    }

    this.httpService.modifyPassword({
      'old_pass': form.value.old_pass,
      'new_pass': form.value.new_pass
    }).subscribe(
      result => {
        this.flashMessages.wechatprompt('修改成功')
        setTimeout( () => {
          this.logout()
        }, 2000)

      }, error => {
        this.flashMessages.wechatprompt(error)
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
