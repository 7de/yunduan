import {Component, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClientService} from '../../service/http-client.service';
import {BusinessService} from '../../service/business.service';
import {ArrayHelper} from '../../common/helper/array-helper';
import {LocalStorageService} from '../../service/local-storage.service';
import {FlashMessagesService} from '../../service/flash-messages.service';
import {Config} from '#{config}/config';

@Component({
  selector: 'app-realname-auth',
  templateUrl: './realname-auth.component.html',
  styleUrls: ['./realname-auth.component.scss']
})

export class RealnameAuthComponent implements OnInit {
  public companyName = ''; // 公司名称
  public typeList;         // 店铺服务类型的列表数据 （请求接口获得）
  public selectedValues: string[] = [];  // 选中的店铺服务类型的数据
  public aptitudeProve = [];    // 行业资质证明图片数据
  public notSelected = []; // 没有选中的店铺服务类型的状态数据
  public errors;                // 错误的信息
  public companyErr = ''        // 公司名称的错误信息
  public serviceType_Info = ''; // 店铺服务类型提示信息
  public error_info = ['请选择一种店铺服务类型', ['请提交行业的资质证明资料', '请提交跟店铺服务类型相关的资质证明' , '请输入公司名称']];  // (检查不合格的报错信息)
  public error_status = [false, false, false];     // 显示错误信息的状态值
  public isSubmit = false; // 控制表单是否可以提交
  public charleng = 30;     // 公司名称字符长度
  public authStatus;       // 验证的状态 (资质证明审核状态)
  public imageDomain: string = Config.imageDomain;  // 图片地址
  // public failText = '';    // 审核不通过的提示信息
  // public failReasonData = [false , false , false]; // 失败字段的状态值 (2店铺类型，1行业资质证，0服务协议)

  constructor(
    public router: Router,
    public http: HttpClientService,
    public localstorage: LocalStorageService,
    private flashMessages: FlashMessagesService,
    private businessService: BusinessService
  ) {}

  ngOnInit() {
    this.aptitudeProve = [''];  // 行业资质证明图片数据,初始化默认有一张
    let account = this.localstorage.get('companyType');  // 获取账号类型
    if (Number(account) === 0) { // 基金公司
      this.router.navigate(['/buyer/personal/index/indexs']);
    } else if (Number(account) === 1) {
      this.ServiceType();  // 获取店铺服务类型列表数据
      this.statusSelect(); // 获取资质证明审核的状态
    }
  }

  /**
   * 选择的店铺服务类型
   */
  selectServiceType(Statetype = 4) {
    // info_verify_type | Statetype状态：0未提交资料  1已认证通过  2未通过审核  3等待审核中 (Statetype)
    // 关联店铺服务类型选中的元素
    const thisAptitudeProve = this.aptitudeProve;
    // 把选择店铺服务类型的个数跟资质证明图片显示的个数绑定一下
    this.aptitudeProve = this.selectedValues.map(function(item, index) {
      return thisAptitudeProve[index] || '';
    });
    // 关联选中的元素，控制店铺类型复选框元素是否可以点击
    if (this.selectedValues.length >= 3) {
      let selectedValues = this.selectedValues;
      this.notSelected = this.typeList.map(function(item, index) {
        return selectedValues.indexOf(String(item.id)) < 0;
      })
    } else {
      this.notSelected = this.typeList.map(function(item, index) {
        return false;
      });
      if (!this.selectedValues.length) { // 资质证明默认显示一个
        this.aptitudeProve.push('');
      }
    }
    this.serviceTypeCheck();
  }

  /**
   * 获取服务类型列表
   */
  ServiceType() {
    this.businessService.getServiceType({}).subscribe(
      res => {
        this.typeList = res;
      },
      error => {
        this.flashMessages.wechatprompt(error);
      }
    );
  }

  /**
   * 实名认证类型 0未提交资料 1已认证通过 2未通过审核 3等待审核中
   */
  statusSelect() {
    let parames = {'expand': 'demands'};  // 参数
    // 获取资质证明审核状态
    this.businessService.getBusiness(parames).subscribe(
      res => {
        this.authStatus = res['info_verify_type']; // 获取行业资质证明认证的状态
        // info_verify_type状态：0未提交资料  1已认证通过  2未通过审核  3等待审核中
        if (res['info_verify_type']) {
          this.companyName = res['company_name'];  // 基金公司名称
          this.charleng = this.companyName.trim().length;  // 公司名称长度文本
          // 拿出店铺服务类型的每一项的ID和资质证明图片
          this.selectedValues = []; // 初始化服务类型数据
          this.aptitudeProve = [];  // 初始化资质证明数据
          for (let i = 0; i < res['demands'].length; i++) {
            this.selectedValues[i] = String(res['demands'][i]['demand_category_id']);  // 店铺服务类型
            this.aptitudeProve[i] = res['demands'][i]['image'];  // 资质证明图片数据数组
          }
          let that = this;
          setTimeout(function() {
            that.selectServiceType(that.authStatus);  // 用户已经选择的店铺服务类型
          }, 20)
        }
        // 审核失败的原因和相应字段
        // if (res['info_verify_type'] === 2) {this.failReason();}
      },
      error => {  // 请求失败
        this.flashMessages.wechatprompt(error);
      }
    );
  }

  /**
   * 审核失败的原因
   */
  /*failReason() {
    this.businessService.getBusiness().subscribe(
      res => {
        // 失败字段的状态值(failReasonData) (0服务协议，1行业资质证，2店铺类型)
        let failField = res['invalidFields'];
        let tmpText = '';
        let failInfoArr = ['服务协议' , '行业的资质证明' , '店铺服务类型'];
        for (let i = 0 ; i < failField.length; i++) {
          this.failReasonData[res['invalidFields'][i].pos] = true;
          if (failField.length === 1 || i === failField.length - 1) {
            tmpText += failInfoArr[res['invalidFields'][i].pos];
          } else {
            tmpText += failInfoArr[res['invalidFields'][i].pos] + '、';
          }
        }
        this.failText = '审核失败：不通过项有（' + tmpText + ')，原因：' + res['invalid_reason'];
      },
      error => {
        this.flashMessages.wechatprompt(error);
      }
    );
  }*/

  /**
   * 行业的资质证明
   */
  authenticationData(event, index) {
    if (event === '') {
      this.aptitudeProve[index] = '';
    } else {
      this.aptitudeProve[index] = event;
    }
    this.aptitudeCheck();
  }

  /**
   * 公司名称输入字符限制
   */
  inputfn(event) {
    this.companyName = event.trim();
    this.charleng = 30 - (event.trim()).length;
    if (!this.companyName) {
      this.error_status[2] = true;
      this.companyErr = this.error_info[1][2];  // 公司名称
    } else {
      this.error_status[2] = false;
    }
  }

  /**
   * 店铺服务类型效验
   */
  serviceTypeCheck() {
    this.isSubmit = false;
    // 处理行业资质证明图片和检查不合格，显示的错误信息，控制是否可以提交表单
    this.error_status[0] = this.selectedValues.length <= 0; // 店铺服务类型检查报错信息
    this.serviceType_Info = ''; // 店铺服务类型错误提示信息
    if (!this.aptitudeProve.length) {  // 行业资质证明检查报错信息
      this.error_status[1] = true;
      this.serviceType_Info = this.error_info[1][0];
    }
  }

  /**
   * 行业资质证明效验
   */
  aptitudeCheck() {
    this.isSubmit = false;
    // 处理行业资质证明图片和检查不合格，显示的错误信息，控制是否可以提交表单
    this.error_status[0] = this.selectedValues.length <= 0; // 店铺服务类型检查报错信息
    this.serviceType_Info = ''; // 店铺服务类型错误提示信息
    if (this.aptitudeProve.length !== this.selectedValues.length) {  // 店铺服务类型和行业资质证明关联不一样检查报错信息(关联个数不一样)
      this.error_status[1] = true;
      this.serviceType_Info = this.error_info[1][1];
    }
    if (this.aptitudeProve.length === this.selectedValues.length) {
      let proveArr = ArrayHelper.deleteEmpty(this.aptitudeProve);
      if (proveArr.length === this.selectedValues.length) {
        this.error_status[1] = false;
      } else {
        this.error_status[1] = true;
        this.serviceType_Info = this.error_info[1][1];
      }
    } else {
      this.error_status[1] = true;
      this.serviceType_Info = this.error_info[1][1];
    }
  }

  /**
   * 处理表单是否可以提交
   */
  formHandle() {
    this.isSubmit = false;
    // 处理行业资质证明图片和检查不合格，显示的错误信息，控制是否可以提交表单
    this.error_status[0] = this.selectedValues.length <= 0; // 店铺服务类型检查报错信息
    this.serviceType_Info = ''; // 店铺服务类型错误提示信息
    if (!this.companyName) {  // 公司名称错误检查报错信息
      this.error_status[2] = true;
      this.companyErr = this.error_info[1][2];
    }
    if (!this.aptitudeProve.length) {  // 行业资质证明检查报错信息
      this.error_status[1] = true;
      this.serviceType_Info = this.error_info[1][0];
    }
    if (this.aptitudeProve.length !== this.selectedValues.length) {  // 店铺服务类型和行业资质证明关联不一样检查报错信息(关联个数不一样)
      this.error_status[1] = true;
      this.serviceType_Info = this.error_info[1][1];
    }
    if (this.aptitudeProve.length === this.selectedValues.length) {
      let proveArr = ArrayHelper.deleteEmpty(this.aptitudeProve);
      if (proveArr.length === this.selectedValues.length) {
        this.error_status[1] = false;
      } else {
        this.error_status[1] = true;
        this.serviceType_Info = this.error_info[1][1];
      }
    } else {
      this.error_status[1] = true;
      this.serviceType_Info = this.error_info[1][1];
    }
    let successNum = 0;
    // 判断检查效验错误的个数
    for (let j = 0; j < this.error_status.length; j++) {
      if (!this.error_status[j]) {
        successNum += 1;
      }
    }
    // 控制是否可以发起请求提交
    if (successNum >= 3) {
      this.isSubmit = true;
    } else {
      return false;
    }
  }

  /**
   *  提交表单事件 (获取表单的数据)
   */
  onSubmit() {
    // 0未提交资料 1已认证通过 2未通过审核 3等待审核中
    if (this.authStatus === 1 || this.authStatus === 3) {
      return false;
    }
    this.formHandle();  // 验证表单
    let proveArr = ArrayHelper.deleteEmpty(this.aptitudeProve);
    if (this.isSubmit) {
      const params = Object.assign({
        // demand_images: this.aptitudeProve,  // 资质证明图片数组
        demand_ids: this.selectedValues,       // 店铺服务类型id
        demand_images: proveArr,               // 资质证明图片数组
        company_name: this.companyName         // 公司名称
      });
      // 发送请求
      this.businessService.setInfo(params , {}).subscribe(
        res => {
          this.router.navigate(['/seller/personal/index/indexs']);
        },
        error => {
          this.flashMessages.wechatprompt(error);
        }
      );
    }
  }
}
