import { Component, OnInit } from '@angular/core';
import { Router, Data } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Config } from '#{config}/config';
import { DatetimeHelper } from '#{common}/helper/datetime-helper';
import {ValidatePhone, ValidEmail} from '#{common}/shared/validator';
import { HttpClientService } from '#{service}/http-client.service';
import { FlashMessagesService } from '#{service}/flash-messages.service';
import { LocalStorageService } from '#{service}/local-storage.service';

const COMPANY_URL = '/company';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
  formGroup: FormGroup;
  company: any;
  extInfo;
  cn: object;
  business_reg_time: Data;
  public errors = {};
  public present  // 按钮文字
  public flag;
  public switchs; //  弹框状态的切换
  public abolish; // 取消按钮
  public timer; // 延时变量
  public submitteds = false; // 弹框是否想显示
  public showed = false; // 图片放大弹框
  public capacitys;  // 存储弹框变量
  public buttons = ['提交审核', '审核通过', '审核中', '重新提交审核']; // 按钮文字
  public buttonValue; // 审核状态
  imgLogo; // logo图片路径 上传图片的路径
  // imgLicense; // 营业执照图片路径 上传图片的路径
  constructor(
    private http: HttpClientService,
    private flashMessages: FlashMessagesService,
    public router: Router,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit() {
    this.cn = Config.calendarLocaleCN;
    this.formGroup = new FormGroup({
      linkman: new FormControl('', [Validators.required]), // 联系人姓名
      email: new FormControl('', [ValidEmail]),
      business_reg_time: new FormControl('', [Validators.required]), //  成立日期
      company_name: new FormControl('', [Validators.required]),  // 公司名称
      name_short: new FormControl('', [Validators.required]),  // 公司简称
      manage_scale: new FormControl('', [Validators.required]), // 总管理规模
      company_scale: new FormControl('', [Validators.required]), // 员工规模
      manage_type: new FormControl('', [Validators.required]), // 管理类别
      reg_number: new FormControl('', [Validators.required]) // 登记编号

      // address: new FormControl('', [Validators.required]), // 公司地址
      // reg_capital: new FormControl('', [Validators.required]), // 公司注册资本
      // card_num: new FormControl('', [Validators.required]), // 身份证号码
      // position: new FormControl('', [Validators.required]),  // 联系人职位
      // email: new FormControl('', [Validators.required]), // 邮箱
      // legal_person: new FormControl('', [Validators.required]), // 企业法人
    });
    this.view();

  }

  /**
   * 获得账号的基本信息,提示填写用户资料
   */
  view() {
    this.http.get(COMPANY_URL, { 'expand': 'extinfo' }).subscribe(
      result => {
        this.company = result;
        this.extInfo = result['extinfo'];
        this.updates(result['extinfo']);
        this.buttonValue = this.buttons[result['flag']];
        this.flag = this.company.flag;
        if (this.flag === 3) {
          this.timers(result['extinfo']);
        }
        this.capacitys = this.localStorage.getObject('capacity');
        if (this.capacitys.submitteds === false) {
          if (this.flag === 0 || this.flag === 3) {
            this.submitteds = true;
          }
        } else {
          this.submitteds = !this.capacitys.submitteds;
        }
        if (this.flag === 0) {
          this.switchs = true;
        } else {
          this.switchs = false;
        }
        if (this.flag === 3) {
          this.abolish = true;
        }
      });
  }

  /*
   *审核不通过时获取已填写过的信息
   */

  updates(extinfo) {
    this.imgLogo = extinfo['company_logo'];
    // this.imgLicense = extinfo['license'];
    this.formGroup.patchValue(Object.assign({
      linkman: extinfo['linkman'],
      email: extinfo['phone'],
      // card_num: extinfo['card_num'],
      // position: extinfo['position'],
      // email: this.company['email'],
      company_name: this.company['company_name'],
      // address: extinfo['address'],
      // legal_person: extinfo['legal_person'],
      reg_number: this.company['reg_number'],
      name_short: extinfo['name_short'],
      // reg_capital: extinfo['reg_capital'],
    }));

  }

  /**
   * 设置默认值
   * @param extinfo
   */
  timers(extinfo) {
    this.formGroup.patchValue(Object.assign({
      business_reg_time: DatetimeHelper.toDate(extinfo['business_reg_time']),
      manage_scale: extinfo['manage_scale'],
      manage_type: extinfo['manage_type'],
      company_scale: extinfo['company_scale']
    }))
  }

  /**
   *
   * 上传图片函数
   * @param event
   */
  onImgLogo(event) {
    this.imgLogo = event;
    // this.errors['imgLogo'] = !Boolean(this.imgLogo);
  }

  onImgLicense(event) {
    // this.imgLicense = event;
    // this.errors['imgLicense'] = !Boolean(this.imgLicense);
  }

  /*
   *前往站内信或者设置页面
   */
  skip() {
    if (this.flag === 0) {
      this.submitteds = !this.submitteds;
    } else {
      this.router.navigate(['/buyer/personal/message'], {
        queryParams : {'notice_type' : 0}
      });
    }
  }

  /**
   * 提交数据事件
   * @param form
   * @returns {boolean}
   */
  onSubmit(form) {
    if (!form.valid) {
      // this.errors['imgLogo'] = !Boolean(this.imgLogo);
      // this.errors['imgLicense'] = !Boolean(this.imgLicense);
      return false;
    }

    const formValue = form.value;
    const params = {
      'linkman': formValue.linkman,
      // 'card_num': formValue.card_num,
      // 'position': formValue.position,
      // 'email': formValue.email,
      'email': formValue.email,
      'company_name': formValue.company_name,
      // 'address': formValue.address,
      'manage_type': formValue.manage_type,
      // 'legal_person': formValue.legal_person,
      'manage_scale': formValue.manage_scale,
      'company_scale': formValue.company_scale,
      // 'reg_capital': formValue.reg_capital,
      'name_short': formValue.name_short,
      'company_logo': this.imgLogo,
      'reg_number': formValue.reg_number.toString(),
      // 'license': this.imgLicense,
      'business_reg_time': formValue.business_reg_time
    };
    /*
    * 提交修改数据
    */
    this.http.put(COMPANY_URL + '?expand=extinfo', params).subscribe(
      result => {
        this.localStorage.setObject('currentCompany', result);
        this.company = result;
        this.present = true;
        this.flashMessages.wechatprompt('提交审核资料成功！');
        this.timer = setTimeout(() => {
          this.router.navigateByUrl('/main/setting/account');
        }, 2000);
      }, err => this.flashMessages.wechatprompt(err));
  }
}
