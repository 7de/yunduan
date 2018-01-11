import {Component, OnInit} from '@angular/core';
import {HttpClientService} from '../service/http-client.service';
import {LocalStorageService} from '../service/local-storage.service';
import {Config} from '../config/config';
import {WechatService} from '../service/wechat.service';

@Component({
  selector: 'app-wechat',
  templateUrl: './wechat.component.html',
  styleUrls: ['./wechat.component.scss']
})
export class WechatComponent implements OnInit {

  officialDomain: string = Config.officialDomain;
  // private indexUrl = '/wechat-info';
  accounts; // 公司公众号基本信息
  result;
  public types; // 公众号类型
  public greens; // 公众号认证状态
  public grays; // 未认证状态
  public authentication // 认证状态
  public authIf: boolean; // 授权与否 false:未授权


  public paramsGet;
  public dataGet;

  getURL = '/auth-url'; // 获取授权地址URL
  constructor(private localStorage: LocalStorageService,
              protected http: HttpClientService,
              private wechatService: WechatService) {
  }

  ngOnInit() {
    this.compangs();
  }

  onActivate(component) {
  }

  // 获取授权地址URL
  getEmpower() {
    const params = Object.assign({url: this.officialDomain + 'wechat/wechat-set/empower'}, this.paramsGet);
    return this.http.post(this.getURL, params).subscribe(
      result => {
        this.dataGet = result;
        this.localStorage.set('dataGet', this.dataGet);
      });
  }

  /*
  *请求公司共众号信息数据
  */
  compangs() {
    this.wechatService.getCompanyInfo().subscribe(
      result => {
        this.authIf = true;
        this.result = result;
        this.accounts = this.result;
        this.localStorage.set('nickname', this.accounts.nickname);
        if (this.accounts.service_type === 2) {
          this.types = '服务号'
        }
        if (this.accounts.service_type === 0) {
          this.types = '订阅号';
        }
        if (this.accounts.service_type === 1) {
          this.types = '订阅号';
        }
        if (this.accounts.verify_type !== -1) {
          this.authentication = '已认证';
          this.greens = true;
        }
        if (this.accounts.verify_type === -1) {
          this.authentication = '未认证';
          this.grays = true;
        }
      },
      error => {
        this.authIf = false;
        this.getEmpower();
      });
    //   this.http.get(this.indexUrl).subscribe(
    //     result => {
    //       this.authIf = true;
    //       this.result = result;
    //       this.accounts = this.result;
    //       this.localStorage.set('nickname', this.accounts.nickname);
    //       if (this.accounts.service_type === 2) {
    //         this.types = '服务号'
    //       }
    //       if (this.accounts.service_type === 0) {
    //         this.types = '订阅号';
    //       }
    //       if (this.accounts.service_type === 1) {
    //         this.types = '订阅号';
    //       }
    //       if (this.accounts.verify_type !== -1) {
    //         this.authentication = '已认证';
    //         this.greens = true;
    //       }
    //       if (this.accounts.verify_type === -1) {
    //         this.authentication = '未认证';
    //         this.grays = true;
    //       }
    //     },
    //     error => {
    //       this.authIf = false;
    //       this.getEmpower();
    //     });
  }
}
