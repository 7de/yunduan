import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Config} from '#{config}/config';
import {FlashMessagesService} from '#{service}/flash-messages.service';
import {FormControl, FormGroup} from '@angular/forms';
import {OrderService} from '#{service}/order.service';
import {DatetimeHelper} from '../../../../../common/helper/datetime-helper';

@Component({
  selector: 'app-store-order',
  templateUrl: './store-order.component.html',
  styleUrls: ['./store-order.component.scss']
})
export class StoreOrderComponent implements OnInit {

  params;
  data;
  form;
  pagination;
  selectedValue = 0;
  shopDialog = 'shop-dialog'; // 弹框class名
  customerShow: Boolean = false;
  cancelShow: Boolean = false;  // 取消订单
  cancelTitle;
  cancelId;
  revokeShow: Boolean = false;  // 撤销申请
  revokeId;
  applicationShow: Boolean = false; // 申请取消订单
  applicationError: Boolean = false;
  applicationReason;
  applicationId;
  agreeShow; // 同意取消订单
  agreeId;
  platformShow; // 申请仲裁(客服介入)
  platformId;
  priceShow: Boolean = false; // 修改价格
  priceError: Boolean = false;
  priceNumError: Boolean = false;
  priceData;
  priceNum: number;
  qqFirst = 'tencent://message/?v=3&amp;uin=';
  qqLast = '&amp;site=qq&amp;menu=yes';

  orderId = this.route.snapshot.params['id'];
  orderType = this.route.snapshot.queryParams['type'];
  cn: object;

  tabClassName = 'custom-tabs-another custom-tabs-sub_another';
  public tabItems = [
    {title: '全部', url: '/seller/personal/index/order', queryParams: {'type': ''}},
    {title: '待付款', url: '/seller/personal/index/order', queryParams: {'type': '1'}},
    {title: '待确认', url: '/seller/personal/index/order', queryParams: {'type': '2'}},
    {title: ' 进行中', url: '/seller/personal/index/order', queryParams: {'type': '3'}},
    {title: '交易结束', url: '/seller/personal/index/order', queryParams: {'type': '4'}}
  ];

  constructor(private orderService: OrderService, private route: ActivatedRoute, public router: Router, private flashMessages: FlashMessagesService) {
    this.pagination = this.pagination || {};
  }

  ngOnInit() {
    this.cn = Config.calendarLocaleCN;
    this.form = new FormGroup({
      goods_title: new FormControl(''),
      order_no: new FormControl(''),
      company_nickname: new FormControl(''),
      status: new FormControl(''),
      from: new FormControl(''),
      to: new FormControl('')
    });
    this.load();
  }

  /*
  * load加载
  * */
  load() {
    this.route.queryParams.subscribe(params => {
      this.form.setValue({
        goods_title: params['goods_title'] || '',
        order_no: params['order_no'] || '',
        company_nickname: params['company_nickname'] || '',
        status: params['status'] || '',
        from: params['from'] ? DatetimeHelper.toDate(params['from']) : '',
        to: params['to'] ? DatetimeHelper.toDate(params['to']) : ''
      });
      let param = Object.assign({
        page: params['page'],
        pageSize: Config.pageSize-2,
        type: params['type'] || '',
      }, this.form.value,{from: params['from'] || '', to: params['to'] || ''});
      this.orderService.getSellerOrder(param).subscribe(res => {
        this.data = res['items'];
        this.pagination = res['_meta'];
      });
      this.orderType = this.route.snapshot.queryParams['type'];
    });
    window.scrollTo(0, 0);
  }

  /*
  * 搜索条件
  * */
  onSubmit(form) {
    this.router.navigate(['/seller/personal/index/order'], {
      queryParams: {
        goods_title: form.goods_title ? form.goods_title.trim() : '',
        order_no: form.order_no ? form.order_no.replace(/\s+/g, '') : '',
        company_nickname: form.company_nickname ? form.company_nickname.trim() : '',
        status: form.status || '',
        from: DatetimeHelper.toTimestamp(form.from) || '',
        to: DatetimeHelper.toTimestamp(form.to) || ''
      },
      queryParamsHandling: 'merge'
    })
  };

  /**
   * select变化
   * @param even
   */

  onChange(even) {
    if (even) {
      this.form.setValue({
        goods_title: '',
        order_no: '',
        company_nickname: '',
        status: '',
        from: '',
        to: ''
      });
    }
  }

  /**
   * 分页操作数据
   * @param e
   */

  paginate(e) {
    this.router.navigate([this.router.url.split('?')[0]], {
      queryParams: {
        page: e.page + 1,
      },
      queryParamsHandling: 'merge'
    });
    window.scrollTo(0, 0);
  }

  /*
  * 联系客服
  * */
  CustomerEven() {
    this.customerShow = true;
  }

  /**
   * 取消订单 -- 未付款
   * @param title 订单标题
   * @param id 订单id
   */
  cancelOrder(title, id) {
    this.cancelTitle = title;
    this.cancelId = id;
    this.cancelShow = true;
  }

  cancelEven(id) {
    this.orderService.getSellerClose(id).subscribe(res => {
      this.flashMessages.wechatprompt(`<i class="ico-global ico-tip-green"></i><div class="mt-5 text-center">操作成功</div>`);
      let timer = setTimeout( () => {
        this.load();
      }, 1500);
      this.cancelShow = false;
    }, error => this.flashMessages.wechatprompt('失败：' + error));
  }

  /*
  * 申请取消订单
  * */
  applicationCancel(id, res?) {
    this.applicationError = false;
    this.applicationReason = res || '';
    this.applicationId = id;
    this.applicationShow = true;
  }

  applicationEven(id, res) {
    this.applicationError = false;
    if (!res) {
      this.applicationError = true;
      return false;
    }
    this.orderService.putSellerCancel({
      business_order_id: id,
      reason: res
    }).subscribe(result => {
      this.flashMessages.wechatprompt(`<i class="ico-global ico-tip-green"></i><div class="mt-5 text-center">提交成功</div>`);
      let timer = setTimeout( () => {
        this.load();
      }, 1500);
      this.applicationShow = false;
    }, error => this.flashMessages.wechatprompt('失败：' + error));
  }

  /*
  * 撤销申请订单
  * */
  revokeOrder(id) {
    this.revokeId = id;
    this.revokeShow = true;
  }

  revokeEven(id) {
    this.orderService.getSellerCancel(id).subscribe(res => {
      this.flashMessages.wechatprompt(`<i class="ico-global ico-tip-green"></i><div class="mt-5 text-center">操作成功</div>`);
      let timer = setTimeout( () => {
        this.load();
      }, 1500);
      this.revokeShow = false;
    }, error => this.flashMessages.wechatprompt('失败：' + error));
  }


  /*
  * 同意取消订单
  * */
  agreeOrder(id) {
    this.agreeId = id;
    this.agreeShow = true;
  }

  agreeEven(id) {
    this.orderService.getSellerAgree(id).subscribe(res => {
      this.flashMessages.wechatprompt(`<i class="ico-global ico-tip-green"></i><div class="mt-5 text-center">操作成功</div>`);
      let timer = setTimeout( () => {
        this.load();
      }, 1500);
      this.agreeShow = false;
    }, error => this.flashMessages.wechatprompt('失败：' + error))
  }

  /*
  * 申请仲裁(客服介入)
  * */
  platformOrder(id) {
    this.platformId = id;
    this.platformShow = true;
  }

  platformEven(id) {
    this.orderService.getSellerPlatform(id).subscribe(res => {
      this.flashMessages.wechatprompt(`<i class="ico-global ico-tip-green"></i><div class="mt-5 text-center">操作成功</div>`);
      let timer = setTimeout( () => {
        this.load();
      }, 1500);
      this.platformShow = false;
    }, error => this.flashMessages.wechatprompt('失败：' + error))
  }

  /*
  * 修改价格priceShow
  * */
  modifyPrice(data) {
    this.priceShow = true;
    this.priceData = data;
    this.priceNum = null;
    this.priceError = false;
    this.priceNumError = false;
  }

  priceEven(id, price) {
    this.priceError = false;
    this.priceNumError = false;
    if (!Number(price)) {
      this.priceError = true;
      return false;
    }
    if (Number(price)) {
      let priceN = String(price).split('.');
      if (priceN.length > 1) {
        if (priceN[1].length > 2) {
          this.priceNumError = true;
          return false;
        }
      }
      if (this.priceNum < 0.00 || this.priceNum > 9999999.99) {
        this.priceNumError = true;
        return false;
      }
    }
    this.orderService.putPrice({
      business_order_id: id,
      money: price
    }).subscribe(res => {
      this.flashMessages.wechatprompt(`<i class="ico-global ico-tip-green"></i><div class="mt-5 text-center">操作成功</div>`);
      let timer = setTimeout( () => {
        this.load();
      }, 1500);
      this.priceShow = false;
    }, error => this.flashMessages.wechatprompt('失败：' + error));

  }

}
