import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Config} from '../../../../../../config/config';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClientService} from '../../../../../../service/http-client.service';
import {LocalStorageService} from '../../../../../../service/local-storage.service';
import {FlashMessagesService} from '../../../../../../service/flash-messages.service';
import {BusinessService} from '../../../../../../service/business.service';
import {ValidDetails, ValidIsEmpty} from '../../../../../../common/shared/validator';
// import {CityService} from '../../../../../../service/city.service';
// import {DatetimeHelper} from '../../../../../../common/helper/datetime-helper';

@Component({
  selector: 'app-seller-personal-information',
  templateUrl: './seller-personal-information.component.html',
  styleUrls: ['./seller-personal-information.component.scss']
})
export class SellerPersonalInformationComponent implements OnInit {

  /*date;
   public params;
   public provinceId;
   public cityValue;
   public selectedCity;
   cn: object; // timepicker汉化
   errMessage; */
  public form;
  public baseInfo;
  public phone = this.localstorage.get('phone');
  picDomain = Config.imageDomain;

  constructor(
    public route: ActivatedRoute,
    private business: BusinessService,
    public http: HttpClientService,
    public localstorage: LocalStorageService,
    public flashMessages: FlashMessagesService
  ) {}

  ngOnInit() {
    // this.cn = Config.calendarLocaleCN;  // 转中文
    this.form = new FormGroup({
      nickname: new FormControl('', [ValidIsEmpty])
    });
    this.info();
  };

  /**
   * 服务商的用户信息
   */
  public info() {
    this.business.getuserinfofn({}).subscribe(
      res => {
        this.baseInfo = res;
        this.form.patchValue({
          nickname: this.baseInfo.username
        });
      }
    )
  }

  /**
   * 表单提交
   */
  onSubmit(form, params) {
    if (!form.valid) {
      return false;
    }
    Object.assign(params, {
      'nickname': form.value.nickname
    });
    this.business.updateSingleInfo(params).subscribe(
      res => {
        this.flashMessages.wechatprompt('保存成功！');
        setTimeout(function() {
          window.location.reload();
        }, 500);
      }, err => {
        // this.errMessage = err;
        this.flashMessages.wechatprompt(err);
      }
    )
  }

  /*ngOnInit() {
   this.cn = Config.calendarLocaleCN; // 转中文
   this.form = new FormGroup({
   name: new FormControl(''),
   sex: new FormControl(''),
   birthday: new FormControl(''),
   province: new FormControl(''),
   city: new FormControl(''),
   district: new FormControl(''),
   });
   this.load();
   this.provinceId = this.form.value.province;
   };

   load() {
   this.route.queryParams.subscribe(params => {
   this.params = Object.assign(
   {
   page: params['page'],
   pageSize: Config.pageSize
   }
   );
   this.info();
   })
   };

   public info() {
   this.http.version = Config.mainApiVersion;
   this.business.getSingleInfo({}).subscribe(
   res => {
   this.baseInfo = res;
   this.date = res['birthday'];
   this.form.patchValue({
   birthday: this.baseInfo.birthday_txt,
   sex: this.baseInfo.sex,
   name: this.baseInfo.nickname,
   });
   this.cityValue = {
   city: res['cityName'],
   city_id: res['city_id'],
   district: res['areaName'],
   district_id: res['area_id'],
   province: res['provinceName'],
   province_id: res['province_id']
   }
   }
   )
   }

   /!**
   * 选择城市
   *!/
   citySelect(e) {
   // 结果
   this.selectedCity = e;
   }

   onSubmit(form, params) {
   if (!form.valid) {
   return false;
   }
   Object.assign(params, {
   // 'nickname': form.value.name || this.baseInfo['nick_name'],
   'nickname': form.value.name,
   'sex': form.value.sex,
   'birthday': DatetimeHelper.toTimestamp(form.value.birthday),
   'province_id': this.selectedCity ? this.selectedCity['province_id'] : this.baseInfo['province_id'],
   'city_id': this.selectedCity ? this.selectedCity['city_id'] : this.baseInfo['city_id'],
   'area_id': this.selectedCity ? this.selectedCity['district_id'] : this.baseInfo['area_id'],
   });
   this.business.updateSingleInfo(params).subscribe(
   res => {
   this.flashMessages.wechatprompt('保存成功！');
   }, err => {
   this.errMessage = err;
   }
   )
   }*/
}
