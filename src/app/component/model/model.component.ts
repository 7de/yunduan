import { Component, OnInit } from '@angular/core';
import {HttpClientService} from '../../service/http-client.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {LocalStorageService} from '../../service/local-storage.service';
import {MainComponent} from '../../common/base/main-component';
import {CompanyService} from '../../service/company.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent extends MainComponent implements  OnInit {
  result;
  company;
  public params;
  public flag;
  public service;
  public switch;
  constructor(
     protected http: HttpClientService,
     protected router: Router,
     private localStorage: LocalStorageService,
     private companyService: CompanyService
  ) {
    super(http);
  }

  ngOnInit() {
    this.reviewed();
  }

  /*
  * 判断提示框
  */
  reviewed () {
      this.company = this.localStorage.getObject('currentCompany');
      this.flag = this.company.flag;
      // 判断读本地还是线上
      if (this.company.flag === 1 ) {
         this.company = this.localStorage.getObject('currentCompany');
         this.flag = this.company.flag;
      } else {
        this.companyService.getCompany().subscribe(res => {
        this.company = res;
        this.flag = this.company.flag;
        // 提示弹框
        if (this.flag !== 1) {
          this.service = true;
        }
        // 切换弹框内容
        if (this.flag === 2) {
          this.switch = true;
        }else {
          this.switch = false;
        }
       });
     }
  }
  /*
   * 点击跳转到设置页面
   */
   skip () {
       this.router.navigateByUrl('main/setting/account');
       this.service = !this.service;
  }
}
