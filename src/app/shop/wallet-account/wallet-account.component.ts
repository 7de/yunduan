import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Config} from '../../config/config';
import {PayService} from '../../service/pay.service';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {FlashMessagesService} from '../../service/flash-messages.service';
import {LocalStorageService} from '../../service/local-storage.service';
import {Data} from '@angular/router';
import {DatetimeHelper} from '../../common/helper/datetime-helper';
import {BusinessService} from '../../service/business.service';
import {CompanyService} from '../../service/company.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ValidPayPass} from '../../common/shared/validator';
import 'rxjs/add/observable/throw'

@Component({
  selector: 'app-wallet-account',
  templateUrl: './wallet-account.component.html',
  styleUrls: ['./wallet-account.component.scss']
})
export class WalletAccountComponent implements OnInit {
  formWallet;
  public cityValue;       // 选择的城市的值
  public IdCardPositive;  // 身份证正面
  public IdCardOpposite;  // 身份证反面
  public bankAccountImg;  // 银行开户许可证
  public organizeLicenseImg;      // 组织结构代码复印件
  public businssLicenseImg;       // 营业执照图片文件
  public licenseTime: Data;       // 营业执照有效期
  // public tissueCodeTime: Data;    // 组织机构代码有效期
  // public OrganizationImg;         // 组织机构代码复印件
  public errorObj = {};   // 显示的错误信息对象
  cn: object;
  public bankCity;        // 银行所在的城市
  public selectedBank = [];      // 选择的银行
  sendCodeTime: number;
  sendCodeDisabled = false;      // 获取验证码是否可以点击
  sendCodeButton = '获取验证码';  // 获取验证提示的文本信息
  public userPhone = this.localStorage.get('phone');          // 获取本地存储的手机号
  public companyType = this.localStorage.get('companyType');  // 获取本地存储的注册用户的类型 (基金公司、服务商)
  public state = 0;    // 基金公司和第三方服务商都是这个状态 0创建 , 1查看 , 2修改
  public banks;        // 显示银行的名字
  public showSelect = false;  // 下拉框
  subscription: Subscription;
  public businessData; // 法人身份证有限期
  public readOnlyStatus = false; // 数据是否可以编辑
  public licenseType;    // 营业执照类型
  public codeToken = ''; // 验证码的token
  public bankName = '';
  public walletStatus = false;  // 钱包开户的状态
  public returnTop = false;     // 返回顶部
  public verifyThrough = false; // 验证通过标示

  constructor(
    private payService: PayService,
    private localStorage: LocalStorageService,
    public route: ActivatedRoute,
    public router: Router,
    private flashMessages: FlashMessagesService,
    private formBuilder: FormBuilder,
    private businessService: BusinessService,
    private companyService: CompanyService) {
  }

  ngOnInit() {
    let that = this;
    if (this.companyType === '0') { // 基金公司查看资料
      this.companyService.getCompany().subscribe(
        res => {
          if (res) {
            // user_verify_type：实名认证类型 0未提交资料 1已认证通过 2未通过审核 3等待审核中
            if (res['wallet'] === 0 || res['wallet'] === null || res['wallet'] === '') {  // 钱包开户
              this.state = 0;
              this.readOnlyStatus = false;
            } else if (res['wallet']['user_verify_type'] === 1) { // 已通过验证
              /*this.state = 1;
              this.readOnlyStatus = true;
              this.walletStatus = true;
              this.verifyThrough = true;
              this.showFundData();*/
              this.state = 1;
              this.readOnlyStatus = true;
              this.walletStatus = true;
              this.verifyThrough = true;
              this.router.navigate(['/buyer/personal/index/indexs']);  // 跳转到个人中心
            } else if (res['wallet']['user_verify_type'] === 2) { // 未通过验证
              this.state = 2;
              this.readOnlyStatus = false;
              this.showFundData();
            } else if (res['wallet']['user_verify_type'] === 3) { // 等待审核中
              this.state = 1;
              this.readOnlyStatus = true;
              this.walletStatus = true;
              this.showFundData();
            } else {
              this.state = 0;
              this.readOnlyStatus = false;
            }
          } else {
            this.state = 0;
            this.readOnlyStatus = false;
          }
        },
        error => {
          if (error === '账号或密码错误，请重输入') {
            this.router.navigate(['/site/home']);
          } else {
            this.flashMessages.wechatprompt(error);
          }
        }
      )
    } else if (this.companyType === '1') {  // 第三方服务商查看资料
      // 发送请求
      let params = {'expand': '	shop,profile,demands,wallet'};
      this.businessService.getBusiness(params).subscribe(
        res => {
          if (res) {
            // user_verify_type：实名认证类型 0未提交资料 1已认证通过 2未通过审核 3等待审核中
            // if (res['wallet']['user_verify_type'] === 0) {  // 钱包开户
            if (res['wallet'] === 0 || res['wallet'] === null || res['wallet'] === '') {  // 钱包开户
              this.state = 0;
              this.readOnlyStatus = false;
            } else if (res['wallet']['user_verify_type'] === 1) {  // 已通过验证
              this.state = 1;
              this.readOnlyStatus = true;
              this.walletStatus = true;
              this.verifyThrough = true;
              this.showBusinessData();
              // this.showBusinessData();
              // this.router.navigate(['/shop/applicationservice']);
              // this.router.navigate(['/seller/personal/index/indexs']);  // 跳转到个人中心
            } else if (res['wallet']['user_verify_type'] === 2) {  // 未通过验证，重新审核
              this.state = 2;
              this.readOnlyStatus = false;
              this.showBusinessData();
            } else if (res['wallet']['user_verify_type'] === 3) {  // 等待审核中
              this.state = 1;
              this.readOnlyStatus = true;
              this.walletStatus = true;
              this.showBusinessData();
            } else {
              this.state = 0;
              this.readOnlyStatus = false;
            }
          } else {
            this.state = 0;
            this.readOnlyStatus = false;
          }
        },
        error => {
          if (error === '账号或密码错误，请重输入') {
            this.router.navigate(['/site/home']);
          } else {
            this.flashMessages.wechatprompt(error);
          }
        }
      );
    }
    this.formWallet = this.formBuilder.group({
      userName: new FormControl('', [Validators.required]),
      idCardEffective: new FormControl('', [Validators.required]),
      IdCardNumber: new FormControl('', [Validators.required]),
      CompanyName: new FormControl('', [Validators.required]),
      licenseNumber: new FormControl('', [Validators.required]),
      licenseTime: new FormControl('', [Validators.required]),
      scopeBusiness: new FormControl('', [Validators.required]),
      companyAddress: new FormControl('', [Validators.required]),
      walletLicence: new FormControl('', [Validators.required]),
      organizationCode: new FormControl('', [Validators.required]),   // 是否隐藏 (组织机构代码)
      tissueCodeTime: new FormControl('', [Validators.required]),     // 是否隐藏  (组织机构代码有效期)
      bankBranch: new FormControl('', [Validators.required]),
      bankName: new FormControl('', [Validators.required]),
      bankAccount: new FormControl('', [Validators.required]),
      PayPassword: new FormControl('', [ValidPayPass]),
      messageCode: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [ValidPayPass])
    });
    if (this.state) {
      if (this.formWallet.controls('messageCode')) {
        this.formWallet.removeControl('messageCode');
      }
    }
    this.cn = Config.calendarLocaleCN;
    this.cityValue = {
      city: '市',
      city_id: '',     // 市id
      district: '区',
      district_id: '',
      province: '省',
      province_id: ''  // 省id
    };
    this.bankCity = {
      city: '市',
      city_id: '',     // 市id
      district: '区',
      district_id: '',
      province: '省',
      province_id: ''  // 省id
    }

    /**
     * 返回顶部
     */
    window.onscroll = function(ev) {
      let scrollHeight = document.documentElement.clientHeight / 2;
      let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop; // 获取滚动条滚动的距离兼容写法
      if (scrollTop >= scrollHeight) {
        that.returnTop = true;
      } else {
        that.returnTop = false;
      }
    }
  }

  /**
   * 基金公司查看数据
   */
  showFundData() {
    this.companyService.getCompany().subscribe(
      res => {
        let returnData = res['wallet'];
        this.IdCardPositive = returnData['card_image1'];  // 身份证正面
        this.IdCardOpposite = returnData['card_image2'];  // 身份证反面
        this.businessData = returnData['card_expire'];    // 法人身份证有效期
        this.bankAccountImg = returnData['bank_open_license']; // 银行开户许可证
        this.businssLicenseImg = returnData['license_image'];  // 营业执照图片文件
        this.licenseTime = returnData['exp_license'];     // 营业执照有效期
        this.licenseType = Number(returnData['type_license']); // 营业执照类型
        let cityDataone = returnData['city_id_txt'];      // 所在城市数据
        let cityDataatwo = returnData['bank_city_txt'];   // 开户行所在地数据
        if (this.licenseType !== 2) {
          this.organizeLicenseImg = returnData['org_code_image']; // 组织机构代码复印件
        }
        this.cityValue = {
          city: cityDataone.split('-')[1],
          city_id: Number(returnData['city_id']),  // 市id
          province: cityDataone.split('-')[0],
          province_id: Number(returnData['province_id'])  // 省id
        };
        this.bankCity = {
          city: cityDataatwo.split('-')[1],
          city_id: returnData['bank_city'],       // 市id
          province: cityDataatwo.split('-')[0],
          province_id: ''      // 省id
        };
        this.banks = {};
        // 开户行名称
        Object.assign(this.banks, {
          code: returnData['bank_code'],         // 银行id
          bank_name: returnData['bank_code_txt'] // 银行名称
        });
        if (this.licenseType === 2) {
          this.formWallet.patchValue(Object.assign({
            userName: returnData['realname'],      // 法人姓名
            IdCardNumber: returnData['card_num'],  // 法人身份证号码
            CompanyName: returnData['name_unit'],  // 企业名称
            licenseNumber: returnData['num_license'],  // 营业执照号码
            scopeBusiness: returnData['busi_user'],    // 经营范围
            companyAddress: returnData['addr_unit'],   // 公司的详细地址
            walletLicence: String(returnData['type_license']), // selectc下拉框
            bankBranch: returnData['brabank_name'],    // 开户支行名称
            bankName: returnData['bank_code_txt'],     // 通过ID找到城市
            bankAccount: returnData['card_no'],        // 银行账号
            PayPassword: '',
            confirmPassword: ''
          }, returnData));
        } else {
          this.formWallet.patchValue(Object.assign({
            userName: returnData['realname'],      // 法人姓名
            IdCardNumber: returnData['card_num'],  // 法人身份证号码
            CompanyName: returnData['name_unit'],  // 企业名称
            licenseNumber: returnData['num_license'],  // 营业执照号码
            scopeBusiness: returnData['busi_user'],    // 经营范围
            companyAddress: returnData['addr_unit'],   // 公司的详细地址
            walletLicence: String(returnData['type_license']), // selectc下拉框
            organizationCode: returnData['org_code'],  // 组织机构代码 (是否隐藏)
            tissueCodeTime: this.formDate(returnData['exp_orgcode']),        // 组织机构代码有效期 (是否隐藏)
            bankBranch: returnData['brabank_name'],    // 开户支行名称
            bankName: returnData['bank_code_txt'],     // 通过ID找到城市
            bankAccount: returnData['card_no'],        // 银行账号
            PayPassword: '',
            confirmPassword: ''
          }, returnData));
        }
      });
  }

  /**
   * 第三方服务商查看数据
   */
  showBusinessData() {
    let params = {'expand': '	shop,profile,demands,wallet'};
    this.businessService.getBusiness(params).subscribe(
      response => {
        let res = response['wallet'];
        this.IdCardPositive = res['card_image1'];  // 身份证正面
        this.IdCardOpposite = res['card_image2'];  // 身份证反面
        this.businessData = res['card_expire'];    // 法人身份证有效期
        this.bankAccountImg = res['bank_open_license']; // 银行开户许可证
        this.businssLicenseImg = res['license_image'];  // 营业执照图片文件
        this.licenseTime = res['exp_license'];     // 营业执照有效期
        this.licenseType = Number(res['type_license']); // 营业执照类型
        let cityDataone = res['city_id_txt'];      // 所在城市数据
        let cityDataatwo = res['bank_city_txt'];   // 开户行所在地数据
        if (this.licenseType !== 2) {
          this.organizeLicenseImg = res['org_code_image']; // 组织机构代码复印件
        }
        this.cityValue = {
          city: cityDataone.split('-')[1],
          city_id: Number(res['city_id']),  // 市id
          province: cityDataone.split('-')[0],
          province_id: Number(res['province_id'])  // 省id
        };
        this.bankCity = {
          city: cityDataatwo.split('-')[1],
          city_id: res['bank_city'],        // 市id
          province: cityDataatwo.split('-')[0],
          province_id: ''      // 省id
        };
        this.banks = {};
        // 开户行名称
        Object.assign(this.banks, {
          code: res['bank_code'],         // 银行id
          bank_name: res['bank_code_txt'] // 银行名称
        });
        if (this.licenseType === 2) {
          this.formWallet.patchValue(Object.assign({
            userName: res['realname'],      // 法人姓名
            IdCardNumber: res['card_num'],  // 法人身份证号码
            CompanyName: res['name_unit'],  // 企业名称
            licenseNumber: res['num_license'],  // 营业执照号码
            scopeBusiness: res['busi_user'],    // 经营范围
            companyAddress: res['addr_unit'],   // 公司的详细地址
            walletLicence: String(res['type_license']), // selectc下拉框
            bankBranch: res['brabank_name'],    // 开户支行名称
            bankName: res['bank_code_txt'],     // 通过ID找到城市
            bankAccount: res['card_no'],        // 银行账号
            PayPassword: '',
            confirmPassword: ''
          }, res));
        } else {
          this.formWallet.patchValue(Object.assign({
            userName: res['realname'],      // 法人姓名
            IdCardNumber: res['card_num'],  // 法人身份证号码
            CompanyName: res['name_unit'],  // 企业名称
            licenseNumber: res['num_license'],  // 营业执照号码
            scopeBusiness: res['busi_user'],    // 经营范围
            companyAddress: res['addr_unit'],   // 公司的详细地址
            walletLicence: String(res['type_license']), // selectc下拉框
            organizationCode: res['org_code'],  // 组织机构代码 (是否隐藏)
            tissueCodeTime: this.formDate(res['exp_orgcode']), // 组织机构代码有效期 (是否隐藏)
            bankBranch: res['brabank_name'],    // 开户支行名称
            bankName: res['bank_code_txt'],     // 通过ID找到城市
            bankAccount: res['card_no'],        // 银行账号
            PayPassword: '',
            confirmPassword: ''
          }, res));
        }
      });
  }

  /**
   * 格式化数据
   * @param date
   */
  formDate(date) {
    if (date) {
      let formDate = date.split('');
      return formDate[0] + formDate[1] + formDate[2] + formDate[3] + '-' + formDate[4] +
        formDate[5] + '-' + formDate[6] + formDate[7];
    }
  }

  /**
   * 身份证正反面 、 银行开户许证的上传图片
   */
  Imgdataupload(event, str) {
    if (str === 'positive') {  // 正面
      this.IdCardPositive = event;
      this.errorObj['positive'] = !Boolean(this.IdCardPositive);
    } else if (str === 'opposite') {      // 反面
      this.IdCardOpposite = event;
      this.errorObj['opposite'] = !Boolean(this.IdCardOpposite);
    } else if (str === 'openingPermit') { // 银行开户许可证
      this.bankAccountImg = event;
      this.errorObj['openingPermit'] = !Boolean(this.bankAccountImg);
    }
  }

  /**
   * 营业执照和组织机构代码的上传图片
   */
  businessLicenses(event, name) {
    switch (name) {
      case 'business':
        this.businssLicenseImg = event;
        this.errorObj['businessLicenseImg'] = !Boolean(this.businssLicenseImg);
        break;
      case 'organize':
        this.organizeLicenseImg = event;
        this.errorObj['organizeLicenseImg'] = !Boolean(this.organizeLicenseImg);
        break;
      default:
        break;
    }
  }

  /**
   * 选择营业执照类型
   * 营业执照类型
   *   0 普通营业执照
   *   1 多证合一营业执照（存在独立的组织机构代 码证）
   *   2 多证合一营业执照（不存在独立的组织机构 代码证）
   *   营业执照类型为0或者1时，需要传组织结构代码相关数据：组织机构代码、组织机构代码有效期、组织机构代码复印件图片
   *     @param ev
   *     组织机构代码 组织机构代码有效期 组织结构代码复印件 营业执照文件（公用）
   */
  licenseSelect(ev) {
    this.licenseType = Number(ev.target.value);
    if (this.licenseType === 0 || this.licenseType === 1) {
      this.formWallet.addControl('organizationCode', new FormControl('', [Validators.required]));
      this.formWallet.addControl('tissueCodeTime', new FormControl('', [Validators.required]));
      this.organizeLicenseImg = '';
    } else {
      if (this.formWallet.controls['organizationCode']) {
        this.formWallet.removeControl('organizationCode');
      }
      if (this.formWallet.controls['tissueCodeTime']) {
        this.formWallet.removeControl('tissueCodeTime');
      }
      this.organizeLicenseImg = '';
    }
  }

  /**
   * 选择的城市
   * @param ev
   */
  citySelect(ev, name) {
    switch (name) {
      case 'bank':
        this.errorObj['bankError'] = false;
        this.bankCity = ev;
        break;
      case 'address':
        this.errorObj['cityError'] = false;
        this.cityValue = ev;
        break;
      default:
        break;
    }
  }

  /**
   * 选择银行 交互
   * @param ev
   */
  selectBank(ev) {
    this.payService.getBankCode({}, ev.target.value).subscribe(
      res => {
        this.selectedBank = [];
        this.selectedBank = res['items'];
      });
    this.showSelect = true;
  }

  clearBanks() {
    if (this.readOnlyStatus) {
      return false;
    }
    this.banks = this.banks ? this.banks : {};
    if (this.banks && this.selectedBank.length) {
      this.banks = this.banks;
    } else {
      this.banks = {};
    }
    // this.showSelect = false;
  }

  /**
   * 显示银行
   * @param name
   * @param code  item?.bank_name,item?.code
   */
  showBank(item) {
    this.banks = {};
    this.banks = item;
    this.formWallet.value.bankName = this.banks['bank_name'];
    this.showSelect = false;
  }

  /**
   * 返回顶部
   */
  goBack() {
    this.returnTop = false;
    window.scrollTo(0, 0);
  }

  /**
   * 发送验证码请求
   * @param form
   * @returns {any}
   */
  sendCode() {
    // 如果是查看，则不让发送验证码
    if (this.state >= 1) {
      return false;
    }
    // 在验证码倒计时的时候，则不让发验证码
    if (this.sendCodeDisabled) {
      return false;
    }
    if (this.companyType === '0') {  // 基金公司发送短信验证码
      this.payService.fundSendCode({}, 1).subscribe(
        res => {
          this.sendCodeTimer();
          this.codeToken = res['token'];
        },
        err => {
          this.flashMessages.wechatprompt(err);
        });
    } else {  // 服务商发送短信验证码
      return this.payService.businessSendCode({}, 1).subscribe(
        res => {
          this.sendCodeTimer();
          this.codeToken = res['token'];
        },
        err => {
          this.flashMessages.wechatprompt(err);
        }
      );
    }
  }

  /**
   * 倒计时
   */
  sendCodeTimer() {
    this.sendCodeTime = 60;
    let timer = Observable.timer(this.sendCodeTime, 1000);
    this.subscription = timer.subscribe(() => {
      if (this.sendCodeTime) {
        this.sendCodeTime--;
        this.sendCodeDisabled = true;
        this.sendCodeButton = this.sendCodeTime + '秒';
      } else {
        this.sendCodeDisabled = false;
        this.sendCodeButton = '获取验证码';
        this.subscription.unsubscribe();  // 取消订阅
      }
    });
  }

  /*
   *  提交表单事件 (获取表单的数据)
   */
  onSubmit(form) {
    /**
     * 如果是查看，则不让提交
     */
    if (this.state === 1) {
      return false;
    }

    if (this.state) {
      if (this.formWallet.controls['messageCode']) {
        this.formWallet.removeControl('messageCode');
      } // 短信验证码
      if (this.licenseType === 2) {
        if (this.formWallet.controls['organizationCode']) {
          this.formWallet.removeControl('organizationCode');
        }  // 组织机构代码
        if (this.formWallet.controls['tissueCodeTime']) {
          this.formWallet.removeControl('tissueCodeTime');
        } // 组织结构代码有效期
      }
    }

    let val = form.value;  // 获取表单的数据
    /**
     * 错误信息效验
     */
    let cityBool = this.cityValue.city_id && this.cityValue.province_id;  // 所在城市
    let bankBool = this.bankCity.city_id;    // 开户行所在地
    if (!form.valid || !this.IdCardPositive || !this.IdCardOpposite || !this.bankAccountImg || !this.businssLicenseImg || !cityBool || !bankBool) {
      this.errorObj['positive'] = !Boolean(this.IdCardPositive); // 身份证正面
      this.errorObj['opposite'] = !Boolean(this.IdCardOpposite); // 身份证反面
      this.errorObj['openingPermit'] = !Boolean(this.bankAccountImg);  // 银行开户许可证
      this.errorObj['businessLicenseImg'] = !Boolean(this.businssLicenseImg);  // 营业执照文件
      this.errorObj['cityError'] = !Boolean(this.cityValue.city_id && this.cityValue.province_id);  // 所在城市
      this.errorObj['bankError'] = !Boolean(this.bankCity.city_id); // 银行城市
      return false;
    }
    /**
     * 营业执照类型文件
     */
    if (!this.businssLicenseImg) {
      this.flashMessages.wechatprompt('请上传营业执照类型文件！');
      return false;
    }

    /**
     * 组织机构代码复印件
     */
    if (this.licenseType !== 2) {
      if (!this.organizeLicenseImg) {
        this.errorObj['organizeLicenseImg'] = !Boolean(this.organizeLicenseImg);
        return false;
      }
    }

    /**
     * 验证两次密码是否是一样
     */
    if (form.value.PayPassword !== form.value.confirmPassword) {
      this.flashMessages.wechatprompt('两次密码不一致！');
      return false;
    }

    /**
     * 验证开户行名称
     */
    if (!this.banks || Object.keys(this.banks).length === 0) {
      this.flashMessages.wechatprompt('开户行名称有误，请选择正确的开户行名称！');
      return false;
    }
    let obj = {}; // 声明一个对象用来存储填写的数据

    /**
     * 验证验证码合法性
     * 基金公司和服务商审核，控制是否要添加验证码和token
     */
    if (!this.state) {
      if (this.codeToken === '') {
        this.flashMessages.wechatprompt('请发送短信验证码！');
        return false;
      } else {
        Object.assign(obj, {
          verify_code: val.messageCode,   // 开户短信验证码
          token: this.codeToken           // 验证码的token
        })
      }
    }

    // 时间格式的处理
    let idCardTime = DatetimeHelper.toTimestamp(val.idCardEffective); // 身份证有效期格式
    let businessTime = DatetimeHelper.toTimestamp(val.licenseTime);   // 营业执照有效期
    Object.assign(obj, {
      realname: val.userName,           // 法人姓名
      card_num: val.IdCardNumber,       // 法人身份证号码
      card_expire: DatetimeHelper.format(idCardTime, 'datetime'),  // 身份证有效期
      card_image1: this.IdCardPositive, // 正面  身份证正面照片
      card_image2: this.IdCardOpposite, // 反面  身份证反面照片
      name_unit: val.CompanyName,       // 企业名称
      province_id: this.cityValue.province_id, // 省id
      city_id: this.cityValue.city_id,         // 市id
      num_license: val.licenseNumber,          // 营业执照号码
      exp_license: DatetimeHelper.format(businessTime, 'datetime'), // 营业执照有效期
      busi_user: val.scopeBusiness,            // 经营范围
      addr_unit: val.companyAddress,           // 公司详细地址
      type_license: this.licenseType,          // 营业执照类型 （见下方说明）
      license_image: this.businssLicenseImg,   // 营业执照图片
      bank_city: this.bankCity.city_id,        // 开户行所在市ID
      brabank_name: val.bankBranch,            // 开户支行名称
      bank_code: this.banks['code'],           // 需要搜索 (所属银行编码)
      card_no: val.bankAccount,                // 银行账号
      bank_open_license: this.bankAccountImg,  // 银行开户许可证复印件图片
      pwd_pay: val.confirmPassword             // 支付密码
    });

    /**
     * 选择营业执照类型
     *   0 普通营业执照
     *   1 多证合一营业执照（存在独立的组织机构代 码证）
     *   2 多证合一营业执照（不存在独立的组织机构 代码证）
     *   营业执照类型为0或者1时，需要传组织结构代码相关数据：组织机构代码、组织机构代码有效期、组织机构代码复印件图片
     *   (根据营业执照类型判断是否添加以下三项）
     */
    if (this.licenseType !== 2) {
      Object.assign(obj, {
        org_code: val.organizationCode,          // (组织机构代码)  是否隐藏
        exp_orgcode: DatetimeHelper.format(DatetimeHelper.toTimestamp(val.tissueCodeTime), 'datetime'),  // (组织机构代码有效期) 是否隐藏
        org_code_image: this.organizeLicenseImg  // 组织机构代码复印件图片 (是否隐藏)
      })
    }
    /**
     * 基金公司和服务商钱包开户的请求
     */
    if (this.companyType === '0' && this.state === 0 || this.companyType === '0' && this.state === 2) {   // 基金公司钱包开户
      this.payService.walletAccount({}, obj).subscribe(
        res => {
          // this.router.navigate(['/buyer/personal/index']);
          this.router.navigate(['/shop/submitapply']);
        },
        error => {
          this.flashMessages.wechatprompt(error);
        }
      );
    } else if (this.companyType === '1' && this.state === 0 || this.companyType === '1' && this.state === 2) { // 服务商钱包开户
      this.businessService.getAuthenticated({}, obj).subscribe(
        res => {
          this.router.navigate(['/shop/submitapply']);
        },
        error => {
          this.flashMessages.wechatprompt(error);
        }
      );
    }
  }
}
