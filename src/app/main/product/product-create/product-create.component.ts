import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import {HttpClientService} from '../../../service/http-client.service';
import {MainComponent} from '../../../common/base/main-component';
import {DatetimeHelper} from '../../../common/helper/datetime-helper';
import {Config} from '../../../config/config';
import {ValidateNum} from '../../../common/shared/validator';
import {FlashMessagesService} from '../../../service/flash-messages.service';

import {ProductService} from '../../../service/product.service';
import {ManagerService} from '../../../service/manager.service';

// const URL = '/foundations';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent extends MainComponent implements OnInit, OnDestroy {

  cn: object;
  formGroup;
  result;
  subscribe = []; // 认购
  subscribeLen = 1;
  // subscribeError = false;
  sell = []; // 赎回
  sellLen = 1;
  // sellError = false;
  purchase = []; // 申购
  purchaseLen = 1;
  // purchaseError = false;

  disabledInput;
  alreadyVal; // 已募集资金

  productData;

  timer;

  serviceBoolean = false; // 运行中状态下跳转到导入数据页面

  managers: Array<any> = []; // 基金经理数组
  create_date: Data;
  sell_start: Data;
  sell_end: Data;

  public errorBool = false;

  public errorMsg = '';

  public productId = this.route.snapshot.queryParams['id'];

  constructor(protected http: HttpClientService,
              public router: Router,
              private flashMessages: FlashMessagesService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private productService: ProductService,
              private managerService: ManagerService) {
    super(http);
  }

  ngOnInit() {
    if (this.productId) {
      this.getProductsData();
    }
    this.alreadyVal = '';
    this.cn = Config.calendarLocaleCN;
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]], // 基金名称
      kind: ['', [Validators.required]], //  基金状态   0 运行中 1 募集中 2 已盘
      backup_num: ['', [Validators.required]], //  基金号
      already: ['', [ValidateNum]], // 已募集额
      create_date: ['', [Validators.required]], //  成立期
      pay_back: ['', [ValidateNum]], //  业绩酬
      publish: ['', [ValidateNum]], //  发行模
      manager_id: ['', [Validators.required]], //   经理
      risk: ['', [Validators.required]], //   风险等级 1高风险 2较高风险 3中等风险 4较低风险 5低险
      type: ['', [Validators.required]], // 基金类型  1 证券 2 股权 3 创业 4 他
      sell_start: ['', [Validators.required]], //   发行开日
      sell_end: ['', [Validators.required]], //   发行结日
      closed_end: ['', [Validators.required]], //   封期
      open_date: ['', [Validators.required]], //    开日
      take_up: ['', [ValidateNum]], //   认购点
      deposit_fee: ['', [ValidateNum]], //  托费
      management_fee: ['', [ValidateNum]], //  固定管费
      float_fee: ['', [ValidateNum]], //  浮动管费
      other_fee: ['', [ValidateNum]], //  其他用
      subscribe: this.formBuilder.array([this.createSubscribe()]),
      purchase: this.formBuilder.array([this.createPurchase()]),
      sell: this.formBuilder.array([this.createSell()]),

    });
    this.getManagers({});
  }

  /**
   * 销毁组件时清除定时器
   */
  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  createSubscribe(): FormGroup {
    return this.formBuilder.group({
      from: [''],
      to: [''],
      rate: ['']
    });
  }

  createPurchase(): FormGroup {
    return this.formBuilder.group({
      from: [''],
      to: [''],
      rate: ['']
    });
  }

  createSell(): FormGroup {
    return this.formBuilder.group({
      from: [''],
      to: [''],
      rate: ['']
    });
  }

  onSubmit(form) {
    // this.subscribeError = !form.controls.subscribe.valid;
    // this.purchaseError = !form.controls.purchase.valid;
    // this.sellError = !form.controls.sell.valid;

    if (!form.valid) {
      return false;
    }
    const formValue = form.value;
    const params = {
      'name': formValue.name,
      'kind': formValue.kind,
      'backup_num': formValue.backup_num,
      'already': formValue.already,
      'create_date': DatetimeHelper.toTimestamp(formValue.create_date),
      'pay_back': formValue.pay_back,
      'publish': formValue.publish,
      'manager_id': formValue.manager_id,
      'risk': formValue.risk,
      'type': formValue.type,
      'sell_start': DatetimeHelper.toTimestamp(formValue.sell_start),
      'sell_end': DatetimeHelper.toTimestamp(formValue.sell_end),
      'closed_end': formValue.closed_end,
      'open_date': formValue.open_date.toString(),
      'take_up': formValue.take_up,
      'deposit_fee': formValue.deposit_fee,
      'management_fee': formValue.management_fee,
      'float_fee': formValue.float_fee,
      'other_fee': formValue.other_fee,
      'subscribe_fee': form.controls.subscribe.value, // 认购费
      'purchase_fee': form.controls.purchase.value, // 申购费
      'sell_fee': form.controls.sell.value // 赎回费
    };


    if (this.productId) {
      this.update(this.productId, params);
    } else {
      this.create(params);
    }
  }

  create(params) {
    this.productService.create(params).subscribe(
      result => {
        this.result = result;
        this.flashMessages.wechatprompt('保存成功！');
        this.timer = setInterval(() => {
          if (this.serviceBoolean) { // 运行中状态下
            this.router.navigate(['main/product/import', this.result.id]);
          } else { // 非运行中状态下
            // this.router.navigate(['main/product/view', this.result.id], {queryParams: {name: this.result.name}});
            this.router.navigate(['main/product/index']);
          }
        }, 3000);
      },
      error => {
        this.errorMsg = error;
        this.errorBool = true;
        this.flashMessages.wechatprompt(error);
      }
    );
  }

  update(id, params) {
    this.productService.update(id, params).subscribe(
      result => {
        this.result = result;
        this.flashMessages.wechatprompt('修改成功！');
        this.timer = setInterval(() => {
          if (this.serviceBoolean) { // 运行中状态下
            this.router.navigate(['main/product/import', this.result.id]);
          } else { // 非运行中状态下
            // this.router.navigate(['main/product/view', this.result.id], {queryParams: {name: this.result.name}});
            this.router.navigate(['main/product/index']);
          }
        }, 500);
      },
      error => {
        this.errorMsg = error;
        this.errorBool = true;
        this.flashMessages.wechatprompt(error);
      }
    );
  }

  /**
   * 展示数据
   */
  getProductsData() {
    // 查看数据追踪
    this.productService.getView(this.productId, {}).subscribe(
      res => {
        // //;(res['updateFee']);
        if (res['kind'] === 0) {
          this.serviceBoolean = true;
        } else {
          this.serviceBoolean = false;
        }
        this.productData = res;
        if (res['kind'] === 2) {
          this.disabledInput = true;
        } else {
          this.disabledInput = false;
        }
        this.formGroup.patchValue(Object.assign({
          manager_id: res['manager']['id'],
          pay_back: res['profile']['pay_back'],
          sell_start: DatetimeHelper.toDate(res['profile']['sell_start']),
          closed_end: res['profile']['closed_end'],
          open_date: res['profile']['open_date'],
          deposit_fee: res['profile']['deposit_fee'],
          management_fee: res['profile']['management_fee'],
          float_fee: res['profile']['float_fee'],
          other_fee: res['profile']['other_fee'],
          sell_end: DatetimeHelper.toDate(res['profile']['sell_end']),
        }, res));

        const subscribeFee = this.productData.updateFee.subscribe_fee || [{'from': '', 'rate': '', 'to': ''}];
        const purchaseFee = this.productData.updateFee.purchase_fee || [{'from': '', 'rate': '', 'to': ''}];
        const sellFee = this.productData.updateFee.sell_fee || [{'from': '', 'rate': '', 'to': ''}];

        this.subscribeLen = subscribeFee.length;
        this.purchaseLen = purchaseFee.length;
        this.sellLen = sellFee.length;

        this.formGroup.setControl('subscribe', this.formBuilder.array(subscribeFee.map((item) => {
          return this.formBuilder.group(item)
        })));

        this.formGroup.setControl('purchase', this.formBuilder.array(purchaseFee.map((item) => {
          return this.formBuilder.group(item)
        })));

        this.formGroup.setControl('sell', this.formBuilder.array(sellFee.map((item) => {
          return this.formBuilder.group(item)
        })));
      });
  }

  /**
   * 请求基金经理name
   */
  getManagers(params: Object) {
    this.managerService.getManagers(params).subscribe(
      result => {
        this.result = result;
        this.managers = this.result.items;
      })
  }

  /**
   * 添加费率
   */
  addItem(control) {
    switch (control) {
      case 'subscribe':
        let subscribeControl = this.formGroup.get('subscribe') as FormArray;
        if (this.subscribeLen < 5) {
          subscribeControl.push(this.createSubscribe());
          this.subscribeLen = subscribeControl.controls.length;
        }
        break;
      case 'purchase':
        let purchaseControl = this.formGroup.get('purchase') as FormArray;
        if (this.purchaseLen < 5) {
          purchaseControl.push(this.createPurchase());
          this.purchaseLen = purchaseControl.controls.length;
        }
        break;
      case 'sell':
        let sellControl = this.formGroup.get('sell') as FormArray;
        if (this.sellLen < 5) {
          sellControl.push(this.createPurchase());
          this.sellLen = sellControl.controls.length;
        }
        break;
      default:
        break;
    }
  }

  /**
   * 删除费率
   */
  deleteItem(control) {
    switch (control) {
      case 'subscribe':
        let subscribeControl = this.formGroup.get('subscribe') as FormArray;
        if (this.subscribeLen > 1) {
          subscribeControl.controls.pop();
          this.subscribeLen = subscribeControl.controls.length;
        }
        break;
      case 'purchase':
        let purchaseControl = this.formGroup.get('purchase') as FormArray;
        if (this.purchaseLen > 1) {
          purchaseControl.controls.pop();
          this.purchaseLen = purchaseControl.controls.length;
        }
        break;
      case 'sell':
        let sellControl = this.formGroup.get('sell') as FormArray;
        if (this.sellLen > 1) {
          sellControl.controls.pop();
          this.sellLen = sellControl.controls.length;
        }
        break;
      default:
        break;
    }
  }

  /**
   * 运行中和已清盘状态下以募集金额不能填写
   */
  disabedFun(e) {
    if (e.target.value === '0') {
      this.serviceBoolean = true;
    } else {
      this.serviceBoolean = false;
    }
    if (e.target.value !== '2') {
      this.disabledInput = false;
      this.alreadyVal = '';
    } else {
      this.disabledInput = true;
      if (!this.productData) {
        this.alreadyVal = 0.00;
      }
    }
  }
}

