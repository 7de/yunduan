import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cookie } from 'ng2-cookies';
import { ValidatePhone, ValidOldPassword } from '#{common}/shared/validator';
import { CompanyService } from '#{service}/company.service';
import { LocalStorageService } from '#{service}/local-storage.service';
import { BusinessService } from '#{service}/business.service'

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  public formLogin: FormGroup;
  public errorString;
  @Output() display = new EventEmitter()

  constructor(
    private ApiService: CompanyService,
    private localStorage: LocalStorageService,
    private BusinessService: BusinessService
  ) { }

  ngOnInit() {
    this.formLogin = new FormGroup({
      account: new FormControl('', [ValidatePhone]), // 表单初始值
      password: new FormControl('', [ValidOldPassword]), // 表单初始值sd
    })
  }

  onLogin(form) {
    if (!form.valid) {
      return false;
    }
    const formValue = form.value;
    const headers = new Headers();
    const authorization = 'Basic ' + btoa(formValue.account + ':' + formValue.password);
    headers.append('Accept', 'application/json');
    this.ApiService.login(
      headers,
      {
        'username': formValue.account,
        'password': btoa(formValue.password)
      }
    ).subscribe(
      result => {
        Cookie.set('currentCompanyAuthorization', authorization, null, '/');
        this.localStorage.set('companyType', result['type']);
        this.localStorage.set('phone', this.formLogin.value.account);
        if (result['type'] === 0) { // 基金公司
          this.display.emit(false);
          window.location.reload(false);
          window.scrollTo(0, 0);
          this.localStorage.setObject('currentCompany', result['account']);
        } else if (result['type'] === 1) {
          const params = { 'expand': 'shop,profile,demands' };
          this.BusinessService.getBusiness(params).subscribe(
            res => {
              this.display.emit(false);
              window.location.reload(false);
              window.scrollTo(0, 0);
              this.localStorage.setObject('serviceCompany', res)
            });
        }
      },
      error => {
        this.errorString = error
      });
  }

}
