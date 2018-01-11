import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {CompanyService} from '#{service}/company.service';
import {Cookie} from 'ng2-cookies';
import {ValidatePhone, ValidOldPassword} from '#{common}/shared/validator';
import {LocalStorageService} from '#{service}/local-storage.service';
import {Headers} from '@angular/http';
import 'rxjs/add/observable/throw'
import {BusinessService} from '#{service}/business.service';
import {Config} from '#{config}/config';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  loginForm;
  account: string;
  public errorString;

  imageDomain: string = Config.imageDomain;
  // sellerInfo;

  constructor(private router: Router,
              private companyService: CompanyService,
              private localStorage: LocalStorageService,
              private business: BusinessService) {
  }

  ngOnInit() {
    if (Cookie.check('currentCompanyAuthorization')) {
      this.router.navigateByUrl('/');
    }
    this.loginForm = new FormGroup({
      account: new FormControl('', [ValidatePhone]), // 表单初始值
      password: new FormControl('', [ValidOldPassword]), // 表单初始值
    })
  }

  /*
   * 跳转到第三方服务商的时高亮
   */
  orderEven() {
    this.router.navigate(['/shop'], {
      queryParams: {demand_category_id: '1'}
    });
  }

  // V1.4
  onLogin(form) {
    if (!form.valid) {
      return false;
    }
    const formValue = form.value;
    const headers = new Headers();
    const authorization = 'Basic ' + btoa(formValue.account + ':' + formValue.password);
    headers.append('Accept', 'application/json');
    this.companyService.login(headers, {'username': formValue.account, 'password': btoa(formValue.password)}).subscribe(
      result => {
        Cookie.set('currentCompanyAuthorization', authorization, null, '/');
        this.localStorage.set('companyType', result['type']);
        this.localStorage.set('phone', this.loginForm.value.account);
        if (result['type'] === 0) { // 基金公司
          this.localStorage.setObject('currentCompany', result['account']);
          this.router.navigate(['/site/home'])
        } else if (result['type'] === 1) {
          const params = {'expand': 'shop,profile,demands,wallet'};
          this.business.getBusiness(params).subscribe(
            res => {
              // this.sellerInfo = res;
              this.localStorage.setObject('serviceCompany', res);
              this.router.navigate(['/site/home']);
            }
          )
        }
      },
      error => {
        this.errorString = error;
      });
  }
}
