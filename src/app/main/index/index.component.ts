import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClientService} from '../../service/http-client.service';
import {OrderUsersService} from '../../service/order-users.service';
import {Config} from '../../config/config';
import {LocalStorageService} from 'app/service/local-storage.service';
import {GetAuthorizationService} from '../../service/get-authorization.service';
import {ConfirmationService} from 'primeng/components/common/confirmationservice';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  public params;
  public data;
  public res;
  public pagination;
  public page;
  public wechat;
  public authorize;
  public logoUrl;
  public callPhone = false;

  // private bookedUrl = '/appointments';

  public doMain = Config.wechatDomain;

  // imgUrl = 'http://qr.liantu.com/api.php?&logo=http://image-test.51simuhui.com/upload/company/1/image/2017/0816/30680f6918301b22587af618d7f2a750.png&text=' + Config.wechatDomain + '?company_id=' + this.localStorage.getObject('currentCompany').id;
  // imgUrl = 'http://qr.liantu.com/api.php?&logo=http://wx.qlogo.cn/mmopen/nmGdPxB1RZfIyQCXg74GwMsPicGeaPTBByUtKLenkSPs634IbMIhf2rUs8WuBI2dVQt3cpKmicFq7gFtfFpk431sof2esMELSV/0&text=' + Config.wechatDomain + '?company_id=' + this.localStorage.getObject('currentCompany').id;

  public gridRules = {
    columns: [
      {label: '预约时间', attribute: 'appointment_date'},
      {label: '姓名', attribute: 'profile.real_name'},
      {label: '手机号码', attribute: 'phone'},
      {label: '身份证号码', attribute: 'profile.id_num'},
      {label: '预约投资产品', attribute: 'foundation.name'}
    ]
  };

  constructor(protected http: HttpClientService,
              private route: ActivatedRoute,
              private orderUsers: OrderUsersService,
              protected localStorage: LocalStorageService,
              private getAuthorization: GetAuthorizationService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.orderUsers.getOrderUsers({pageSize: 5}).subscribe(
          res => {
            this.data = res['items'];
          });
      });
    this.saveValue();
    // this.getData();
  }

  saveValue() {
    this.localStorage.setObject('capacity', {'submitteds': true});
  }


// 获取公众号信息
  getData() {
    this.getAuthorization.getAuthorization().subscribe(
      res => {
        this.logoUrl = res['logo_url'];
        // //;(this.logoUrl);
        this.wechat = true;
        this.authorize = false;
      },
      error => {
        this.wechat = false;
        this.authorize = true;
      }
    );
  }

  /**
   * 拨打客服电话
   */
  // getPhone() {
    // this.confirmationService.confirm({
    //   key: 'managerDel',
    //   icon: 'fa',
    //   // header: '拨打客服电话',
    //   message: '咨询电话：0755-86538075',
    //   accept: () => {
    //   }
  //   });
  // }
}
