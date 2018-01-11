import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShopShowService} from '#{service}/shop-show.service';
import {FormBuilder, Validators} from '@angular/forms';
import {FlashMessagesService} from '#{service}/flash-messages.service';
import {HttpClientService} from '#{service}/http-client.service';
import {ShopService} from '#{service}/shop.service';
import {OrderService} from '#{service}/order.service';
import {ValidatePhone, ValidDetails, ValidSelect} from '#{common}/shared/validator';
import {Config} from '#{config}/config';
import {Observable} from 'rxjs/Observable';
import {Headers} from '@angular/http';
import {CompanyService} from '#{service}/company.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {

  public goodsId = this.route.snapshot.queryParams['goodsId'];
  shopId;
  goodsData;
  companyData; // 公司信息
  display: Boolean = false; // 显示个人资料引导弹框
  fileAry = [];
  fileId = [];
  uploadFileUrl = '/file/upload-img?fileType=business';
  fileProcess:boolean = false;
  lawShow: Boolean = false; // 是否显示须知

  formGroup;

  constructor(private route: ActivatedRoute,
              private shopShowService: ShopShowService,
              private formBuilder: FormBuilder,
              private flashMessages: FlashMessagesService,
              private http: HttpClientService,
              private getShopInfoService: ShopService,
              private companyService: CompanyService,
              private orderService: OrderService,
              public router: Router) {
  }

  ngOnInit() {
    this.getGoodsDetails();
    this.formGroup = this.formBuilder.group({
      mobile: ['', [ValidatePhone]],
      description: ['', [ValidDetails]],
      agree:['']
    });
  }

  /**
   * 获取商品信息
   */
  getGoodsDetails() {
    this.shopShowService.getShopDetails({}, this.goodsId).subscribe(
      res => {
        this.goodsData = res;
        this.shopId = res['shop_id'];
      });
  }

  /**
   * 提交
   */
  onSubmit(form) {
    let val = form.value;
    if (!form.valid) {
      return false;
    }
    if (!val.agree) {
      this.flashMessages.wechatprompt('请勾选云端私募荟预定须知');
      return false;
    }
    let obj = {
      shop_id: this.shopId,
      mobile: val.mobile,
      goods_id: this.goodsId,
      demand_content: val.description,
      demand_file: this.fileId
    };

    if (obj) {
      this.orderService.creatOrders({}, obj).subscribe(
        res => {
          this.flashMessages.wechatprompt(`<i class="ico-global ico-tip-green"></i><div class="mt-5 text-center">提交成功</div>`);
          let timer = setTimeout(() => {
            this.router.navigate(['/buyer/facilitator/pay'], {queryParams: {id: res['id']}});
          }, 2000);
        },
        error => {
          this.flashMessages.wechatprompt(error);
        });
    }
  }

  /**
   * 显示须知
   * @param type
   */
  checkLaw(type?) {
    if (type) {
      this.lawShow = false;
    } else {
      this.lawShow = true;
    }
    window.scrollTo(0, 0);
  }

  /**
   * 获取公司信息
   */
  getCompanyInfo() {
    this.companyService.getCompany().subscribe(
      res => {
        this.companyData = res;
      });
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
