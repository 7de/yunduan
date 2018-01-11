import {Injectable} from '@angular/core';
import {HttpClientService} from '../service/http-client.service';
import {MainComponent} from '../common/base/main-component';
import {ActivatedRoute} from '@angular/router';
import {Config} from '../config/config';

const indexUrl = '/users';  // 已投资用户请求数据Url
const viewedUrl = '/user-profiles'; // 已浏览用户请求数据Url
const bookedUrl = '/appointments'; // 预约记录请求数据Url
const markUrl = '/track-records'; // 预约记录添加标记Url---post
const productUrl = '/foundations'; // 预约记录产品查看
const historyUrl = '/orders'; // 历史投资记录
const trackingUrl = '/appointments'; // 跟踪记录请求Url
const productValueUrl = '/foundations'; // 基金数据===get
const createUrl = '/orders'; // 添加投资记录==post
const exportUrl = '/export-excel'; // 导出Url


@Injectable()
export class UsersService extends MainComponent {

  constructor(protected http: HttpClientService, public route: ActivatedRoute) {
    super(http)
  }

  // 已投资用户请求数据===get请求
  invested(params: Object) {
    this.http.version = Config.mainApiVersion;
    Object.assign(params, {expand: 'orderMoney,profile,orderNumber,orderNew'});
    return this.http.get(indexUrl, params);
  }

  // 已投资用户查看具体信息===get请求
  infos(id, params: Object) {
    this.http.version = Config.mainApiVersion;
    Object.assign(params, {expand: 'profile,orderMoney,answer,orderNumber,orderNew,orderNew'});
    return this.http.get(indexUrl + '/' + id, params);
  }

  // 已浏览请求数据===get请求
  viewed(params: Object) {
    this.http.version = Config.mainApiVersion;
    Object.assign(params, {
      'expand': 'orderMoney,user,orderNumber',
    });
    return this.http.get(viewedUrl, params);
  }

  // 预约用户请求数据===get请求
  booked(params: Object) {
    this.http.version = Config.mainApiVersion;
    Object.assign(params, {
        'expand': 'user,profile,foundation'
      }
    );
    return this.http.get(bookedUrl, params)
  }

  // 预约用户===标记确定发送post请求
  mark(params: Object) {
    this.http.version = Config.mainApiVersion;
    return this.http.post(markUrl, params)
  }

  // 预约用户===投资产品查看
  productCheck(id, params: Object) {
    this.http.version = Config.mainApiVersion;
    Object.assign(params, {
        'expand': 'percent,profile,newIncome,manager,company'
      }
    );
    return this.http.get(productUrl + '/' + id, params)
  }

// 历史投资记录请求数据===get请求
  history(params: Object) {
    this.http.version = Config.mainApiVersion;
    Object.assign(params, {
      'expand': 'foundation,foundationProfile',
    });
    return this.http.get(historyUrl, params)
  }

  // 跟踪记录请求数据===get请求
  tracking(params: Object) {
    this.http.version = Config.mainApiVersion;
    Object.assign(params, {
      'expand': 'user,profile,foundation',
    });
    return this.http.get(trackingUrl, params);
  }

  // 添加投资记录弹框请求数据
  // 查询产品信息
  productValue(params: Object) {
    this.http.version = Config.mainApiVersion;
    Object.assign(params, {
      'expand': 'percent,income,profile,newIncome,manager'
    });
    return this.http.get(productValueUrl, params)
  }

  // 根据产品id查询产品状态
  productKind(id, params: Object) {
    this.http.version = Config.mainApiVersion;
    Object.assign(params, {
      'expand': 'percent,income,profile,newIncome,manager'
    });
    return this.http.get(productValueUrl + '/' + id, params);
  }

  // 添加投资记录===确定发送post请求
  investedAdd(params: Object) {
    this.http.version = Config.mainApiVersion;
    Object.assign(params)
    return this.http.post(createUrl, params);
  }

}
