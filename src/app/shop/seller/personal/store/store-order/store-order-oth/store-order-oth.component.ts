import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FlashMessagesService} from '#{service}/flash-messages.service';
import {Config} from '#{config}/config';
import {DatetimeHelper} from '#{common}/helper/datetime-helper';
import {OrderService} from '#{service}/order.service';

@Component({
  selector: 'app-store-order-oth',
  templateUrl: './store-order-oth.component.html',
  styleUrls: ['./store-order-oth.component.scss']
})
export class StoreOrderOthComponent implements OnInit {

  data;
  orderId = this.route.snapshot.params['id'];
  cn: object; // timepicker汉化

  uploadFileUrl = '/upload?fileType=business';
  date; // 上传方案及交付时间
  finalDemand;
  fileAry = [];
  fileId = [];
  finalDemandError: Boolean = false;
  dateError: Boolean = false;
  serverDemand; // 上传提交服务
  serverfileAry = [];
  serverfileId = [];
  serverDemandError: Boolean = false;
  qqFirst = 'tencent://message/?v=3&amp;uin=';
  qqLast = '&amp;site=qq&amp;menu=yes';

  fileProcess:boolean = false;

  // @ViewChild('myInput') myInputVariable: any;

  constructor(private orderService: OrderService, private route: ActivatedRoute, private flashMessages: FlashMessagesService, public router: Router) {
  }

  ngOnInit() {
    this.cn = Config.calendarLocaleCN; // 转中文
    this.load();
  }

  /*
  * 初始化
  * */
  load() {
    this.orderService.getSellerOrder({}, this.orderId).subscribe(res => {
      this.data = res;
      if (this.data['businessPlan']) {
        this.finalDemand = this.data['businessPlan'].content || '';
        this.date = this.data.final_date_txt || '';
        this.fileAry = this.data['businessPlan'].file || [];
        // console.log(this.fileAry);
        if (this.data['businessPlan'].file.length > 0) {
          for (let i = 0; i < this.data['businessPlan'].file.length; i++) {
            this.fileId.push(Number(this.data['businessPlan'].file[i].id));
          }
        } else {
          this.fileId = [];
        }
      }
      if (this.data['finalPlan']) {
        this.serverDemand = this.data['finalPlan'].content || '';
        this.serverfileAry = this.data['finalPlan'].file || [];
        // console.log(this.serverfileAry);
        if (this.data['finalPlan'].file.length > 0) {
          for (let i = 0; i < this.data['finalPlan'].file.length; i++) {
            this.serverfileId.push(Number(this.data['finalPlan'].file[i].id));
          }
        } else {
          this.serverfileId = [];
        }
      }
    });
    window.scrollTo(0, 0);
  }

  /*
  *最终确认时间
  * */
  finalOrder(id, oth?) {
    this.finalDemandError = false;
    this.dateError = false;
    if (!this.finalDemand) {
      this.finalDemandError = true;
      return false;
    } else if (!this.date) {
      this.dateError = true;
      return false;
    }
    if (oth) {
      this.orderService.putSellerFinal({
        business_order_id: id,
        final_date: DatetimeHelper.toTimestamp(this.date),
        content: this.finalDemand,
        file: this.fileId
      }).subscribe(res => {
        this.flashMessages.wechatprompt('提交成功！');
        let timer = setTimeout( () => {
          history.go(-1);
        }, 1500);
      }, error => this.flashMessages.wechatprompt('失败：' + error));
    } else {
      this.orderService.postSellerFinal({
        business_order_id: id,
        final_date: DatetimeHelper.toTimestamp(this.date),
        content: this.finalDemand,
        file: this.fileId
      }).subscribe(res => {
        this.flashMessages.wechatprompt('提交成功！');
        let timer = setTimeout( () => {
          history.go(-1);
        }, 1500);
      }, error => this.flashMessages.wechatprompt('失败：' + error));
    }

  }

  /*
  * 上传提交服务
  * */
  serverOrder(id, oth?) {
    this.serverDemandError = false;
    if (!this.serverDemand) {
      this.serverDemandError = true;
      return false;
    }
    if (oth) {
      this.orderService.putService({
        business_order_id: id,
        content: this.serverDemand,
        file: this.serverfileId
      }).subscribe(res => {
        this.flashMessages.wechatprompt('提交成功！');
        history.go(-1);
      }, error => this.flashMessages.wechatprompt('失败：' + error));
    } else {
      this.orderService.postService({
        business_order_id: id,
        content: this.serverDemand,
        file: this.serverfileId
      }).subscribe(res => {
        this.flashMessages.wechatprompt('提交成功！');
        history.go(-1)
      }, error => this.flashMessages.wechatprompt('失败：' + error));
    }
  }

  /**
   * 获取上传中文件状态
   * @param e
   */
  processMethod(e){
    if(e!==100){
      this.fileProcess = true;
    }else {
      this.fileProcess = false;
    }
  }

}
