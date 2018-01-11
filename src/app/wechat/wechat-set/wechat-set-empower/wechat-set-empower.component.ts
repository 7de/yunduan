import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClientService} from '../../../service/http-client.service';
import {WechatComponent} from '../../../common/base/wechat-component';
import {LocalStorageService} from '../../../service/local-storage.service';
import {GetAuthorizationService} from '../../../service/get-authorization.service';


@Component({
  selector: 'app-wechat-set-empower',
  templateUrl: './wechat-set-empower.component.html',
  styleUrls: ['./wechat-set-empower.component.scss']
})
export class WechatSetEmpowerComponent extends WechatComponent implements OnInit {

  // 未授权变量
  authCODE = this.route.snapshot.queryParams['auth_code'];

  public params;
  public data; // 返回公众号信息

  // getURL = '/auth-url'; // 获取授权地址URL
  // public paramsGet;
  public dataGet;

  addURL = '/add-auth'; // 添加授权公众号
  paramsAdd;
  dataAdd;

  constructor(protected http: HttpClientService,
              private route: ActivatedRoute,
              public router: Router,
              private localStorage: LocalStorageService,
              private getAuthorization: GetAuthorizationService) {
    super(http);
    this.route
      .queryParams
      .subscribe(params => {
        this.getData();
        this.dataGet = this.localStorage.get('dataGet');
        // //;(this.dataGet);
      });
  }

  ngOnInit() {
  }

  // 获取公众号信息
  getData() {
    // return this.http.get(this.getinfoUrl).subscribe(
    //   result => {
    //     this.data = result;
    //     // //;(this.data);
    //   },
    //   error => {
    //     if (this.authCODE) {
    //       this.addEmpower();
    //     }
    //   }
    // );
    return this.getAuthorization.getAuthorization().subscribe(
      res => {
        this.data = res;
      },
      error => {
        if (this.authCODE) {
          this.addEmpower();
        }
      }
    );
  }

  // 获取授权地址URL
  // getEmpower() {
  //   const params = Object.assign({url: this.officialDomain + 'wechat/wechat-set/empower'}, this.paramsGet);
  //   return this.http.post(this.getURL, params).subscribe(
  //     result => {
  //       this.dataGet = result;
  //     });
  // }

  // 添加授权公众号
  addEmpower() {
    const params = Object.assign({auth_code: this.authCODE}, this.paramsAdd);
    return this.http.post(this.addURL, params).subscribe(
      result => {
        this.dataAdd = result;
        this.router.navigate(['/wechat/wechat-index']);
        location.reload();
      });
  }
}
