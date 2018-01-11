import {Component, OnInit} from '@angular/core';
import {MainComponent} from '../../../common/base/main-component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FlashMessagesService} from '../../../service/flash-messages.service';
import {HttpClientService} from '../../../service/http-client.service';
import {ValidatePhone, ValidQQ} from '../../../common/shared/validator';
import {Config} from '../../../config/config';
import {ShopService} from '../../../service/shop.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageService} from '../../../service/local-storage.service';
import {BusinessService} from '../../../service/business.service';

@Component({
  selector: 'app-step-info',
  templateUrl: './step-info.component.html',
  styleUrls: ['./step-info.component.scss']
})
export class StepInfoComponent extends MainComponent implements OnInit {
  textareaobj = {val: '', num: 0};  // 店铺简介字数
  public uploadFileUrl = '/upload?fileType=image'; // 上传的图片
  public logoUrl = '';  // 店铺封面图片
  public imgAry = [];   // 店铺图片数组
  public errors = {};   // 错误信息
  public formGroup: FormGroup;  // 表单
  public selectVal = ['时效性快', '功能齐全', '操作便捷', '界面人性化', '协作性高', '实时灵活', '交互性好', '透明度强', '成本低廉', '全方位开放'];  // 服务特点
  public selectService = [false, false, false, false, false, false, false, false, false, false];  // 服务特点初始值
  public selectedValues = [];   // 服务特点选中的数组
  public notSelect = [];   // 服务特点 - 没有选中
  public storeLengs = 18;  // 店铺名称字数
  public isstatus = false; // 是否可以点击提交
  public isdisabled = false;    // 提交按钮是否可用
  public noReleaseShow: Boolean = false; // 未认证弹框
  public serviceInfoData; // 当前服务商信息
  public ishandle = 'createStore';
  public shopDialog = 'shop-dialog'; // 弹框class名

  constructor(
    protected http: HttpClientService,
    private router: Router,
    private formBuilder: FormBuilder,
    private flashMessages: FlashMessagesService,
    private shopService: ShopService,
    private businessService: BusinessService,
    private routeInfo: ActivatedRoute,
    private localStorage: LocalStorageService,
    private business: BusinessService
  ) {
    super(http);
  }

  ngOnInit() {
    // 初始化表单
    this.formGroup = this.formBuilder.group({
      shop_name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(18)]], // 店铺名称
      qq: ['', [Validators.required]], // 客服QQ号
      phone: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(18)]],     // 客服电话
      introduction: [''] // 店铺简介
    });
    this.judgehandle(); // 获取店铺信息
    this.serviceInfo();
  }

  /**
   * 获取当前登入的店铺信息，根据条件判断是否修改或设置
   */
  judgehandle() {
    let param = {'expand': 'features,photos'};
    this.shopService.getLoginShopInfo(param).subscribe(
      res => {
        let dataId = res['id'];
        if (dataId) { //  修改店铺信息
          this.logoUrl = Config.apiDomain + res['logo_url']; // 店铺封面
          let photoAry = res['photos'];
          for (let i = 0; i < photoAry.length; i++) {
            this.imgAry.push(photoAry[i]['image']);  // 店铺图片
          }
          // 给表单设置默认值
          this.formGroup.patchValue(Object.assign({
            shop_name: res['name'], // 店铺名称
            qq: res['qq'],          // 客服qq号
            phone: res['phone'],    // 客服电话
            introduction: res['introduction']   // 店铺简介
          }, res));
          this.textareaobj.num = this.formGroup.value.introduction.length;  // 店铺简介显示的字数
          this.storeLengs = 18 - this.formGroup.value.shop_name.length;  // 店铺名称显示的字数
          let tmpArr = []; // 声明一个空数组
          let tmpvar = res['features'];
          tmpArr = res['features'].map(function(item , index) { // 处理服务特点数据
            return tmpvar[index]['id'] - 1;
          })
          this.selectedValues = tmpArr; // 处理过后选择的服务特点
          let serviceVal = this.selectedValues;
          this.selectService = this.selectService.map(function(item , index) {
            return serviceVal.indexOf(index) >= 0;
          })
          if (this.selectedValues.length >= 5) {
            this.notSelect = this.selectService.map(function(item , index){
              return serviceVal.indexOf(index) < 0;
            })
          } else {
            this.notSelect = this.selectService.map(function(item , index){
              return false;
            })
          }
          this.ishandle = 'setStore';
        } else {
          this.logoUrl = '';
        }
      }
    );
  }

  /**
   * 当前服务商信息
   */
  serviceInfo() {
    this.businessService.getBusiness({expand: 'shop,wallet'}).subscribe(res => {
      this.serviceInfoData = res;
    }, error => {

    })
  }

  /**
   * 提交资料判断
   */
  releaseFn() {
    /*console.log(this.serviceInfoData);
    console.log(this.serviceInfoData.info_verify_type);
    console.log(this.serviceInfoData.wallet.user_verify_type);*/
    // 资质证明和钱包开户状态判断，两个都要为1，表示两个都通过
    if (this.serviceInfoData.info_verify_type) {
      if (this.serviceInfoData.wallet === null || this.serviceInfoData.wallet.user_verify_type !== 1) {
        this.noReleaseShow = true;
        return false
      } else {
        return true;
      }
    } else {
      this.noReleaseShow = true;
      return false
    }
  }

  /**
   * 上传店铺封面
   */
  uploadLogo(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.http.version = Config.mainApiBusiness;
      this.http.uploadFile(this.uploadFileUrl, file).subscribe(
        result => {
          this.logoUrl = Config.apiDomain + result['filename'];
          this.errors['logo'] = !Boolean(this.logoUrl);
        },
        error => {
          this.flashMessages.wechatprompt(error);
        }
      )
    }
  }

  /**
   * 店铺名称
   */
  storeleng(event) {
    let text = event.value.trim();
    this.storeLengs = 18 - text.length;
  }

  /**
   * input is status
   */
  inputChage(event) {
    this.isstatus = true;
  }

  /**
   *  店铺简介
   */
  textareatext(textarea) {
    let text = textarea.value;
    if (text.length < 200) {
      this.textareaobj.val = text;
      this.textareaobj.num = text.length;
    } else {
      this.textareaobj.val = text.substring(0, 200);
      this.textareaobj.num = 200;
    }
  }

  /**
   * 上传店铺图片
   */
  uploadImg(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0 && this.imgAry.length <= 4) {
      const file: File = fileList[0];
      this.http.version = Config.mainApiBusiness;
      this.http.uploadFile(this.uploadFileUrl, file).subscribe(
        result => {
          this.imgAry.push(result['filename']);
        },
        error => {
          this.flashMessages.wechatprompt(error);
        });
    } else {
      this.flashMessages.wechatprompt('最多只能选择4张图片');
    }
  }

  /**
   * 删除店铺封面
   */
  clearbtn() {
    this.logoUrl = '';
  }

  /**
   * 删除店铺图片
   * @param idx
   */
  deleteFile(idx) {
    this.imgAry.splice(idx, 1);
  }

  /**
   * 为店铺选择特性
   */
  checked(index) {
    if (this.selectedValues.length >= 5) {  // 不能选择添加服务特点
      if (this.selectService[index]) {
        let numIndex = this.selectedValues.indexOf(index);
        this.selectedValues.splice(numIndex , 1);
        this.selectService[index] = false;
        this.notSelect = this.selectService.map(function(){
          return false;
        })
      } else {
        return false;
      }
    } else {  // 可以选择服务特点
      if (this.selectService[index]) {  // 取消选择
        let numIndex = this.selectedValues.indexOf(index);
        this.selectedValues.splice(numIndex , 1);
        this.selectService[index] = false;
        this.notSelect = this.selectService.map(function(){
          return false;
        })
      } else {  // 添加服务特点选择
        this.selectedValues.push(index);
        this.selectService[index] = !Boolean(this.selectService[index]);
        this.notSelect = this.selectService.map(function(){
          return false;
        })
      }
    }
    this.selectedValues = this.selectedValues.sort(); // 排序一下
  }

  /**
   * 提交数据
   * @param form
   * @return {boolean}
   */
  onSubmit(form) {
    // 判断资质证明和钱包开户是否通过
    if (!this.releaseFn()) {
      return false;
    }

    // 改变标识状态
    this.isstatus = true;
    if (!form.valid) {
      return false;
    }
    /**
     * 效验合法性：店铺封面、店铺图片、服务特点
     */
    // if (this.logoUrl === '' || this.imgAry.length <= 0 || this.selectedValues.length <= 0) {
    if (this.logoUrl === '') {
      return false;
    }
    let tmpArr = []; // 声明一个空数组
    // 处理服务特点数据
    tmpArr = this.selectedValues.map(function(item , index) {
      return item + 1;
    })
    this.selectedValues = [];  // 清空选择的服务特点
    this.selectedValues = tmpArr; // 处理过后选择的服务特点
    const formValue = form.value; // 表单数据
    const params = {
      'logo_url': this.logoUrl ? this.logoUrl.split('//')[2] : '', // 店铺封面
      'name': formValue.shop_name, // 店铺名称
      'qq': formValue.qq,          // 客服QQ号
      'phone': formValue.phone,    // 客服电话
      'photos': this.imgAry,       // 店铺图片
      'introduction': formValue.introduction, // 店铺简介
      'features': this.selectedValues // 服务特点
    };
    if (this.ishandle === 'createStore') { // 判断是设置或修改
      this.shopService.createShop({}, params).subscribe(
        res => {
          this.flashMessages.wechatprompt('添加店铺成功！');  // 跳转
          this.isdisabled = true;
          const param = {'expand': 'shop,profile,demands'};
          this.business.getBusiness(param).subscribe(
            result => {
              this.localStorage.setObject('serviceCompany', result); // 更新一下本地存储
              setTimeout(() => {
                /*this.router.navigate(['/seller/store/goods']);*/
                location.reload();
              }, 2000);
            }
          )
        })
    } else if (this.ishandle === 'setStore') {  // 修改店铺信息
      this.shopService.updateShopInfo({}, params).subscribe(
        res => {
          this.flashMessages.wechatprompt('修改店铺信息成功！');
          this.isdisabled = true;
          setTimeout(() => {
            /* this.router.navigate(['/shop/step']); */
            location.reload();
          }, 2000);
        })
    }
  }
}
