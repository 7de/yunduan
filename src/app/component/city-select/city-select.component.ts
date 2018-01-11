import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {CityAddress} from '../../common/city/mit-city.model';
import {CityService} from '../../service/city.service';

@Component({
  selector: 'app-city-select',
  templateUrl: './city-select.component.html',
  styleUrls: ['./city-select.component.scss']
})
export class CitySelectComponent implements OnInit, OnChanges {

  @Output() result = new EventEmitter();
  public selected;
  @Input() defaultSelect: Object;
  @Input() errorClass;
  @Input() linkageTags = this.linkageTags ? this.linkageTags : 3; // 默认参数，控制城市联动是几级
  public showSelect = '请选择所在地';
  public isExpand: Boolean = false;
  public list;

  public provinceId;
  public cityId;
  public districtId;

  public provinceName;
  public cityName;
  public districtName;

  constructor(private cityService: CityService) {
  }

  ngOnInit() {
    /**
     * 获取城市
     */
    this.cityService.getAllCity({}).subscribe(
      res => {
        this.list = res;
      }
    );
  }

  /**
   * 解决 previewImg 参数不更新
   * @param {SimpleChanges} changes
   */
  ngOnChanges(changes: SimpleChanges) {
    this.provinceId = this.defaultSelect ? this.defaultSelect['province_id'] : '';
    this.cityId = this.defaultSelect ? this.defaultSelect['city_id'] : '';
    if (this.linkageTags === 3) {
      this.districtId = this.defaultSelect ? this.defaultSelect['district_id'] : '';
      this.showSelect = this.defaultSelect ? this.defaultSelect['province'] + ' - ' + this.defaultSelect['city'] + ' - ' + this.defaultSelect['district'] : '';
      this.districtId = this.defaultSelect ? this.defaultSelect['district_id'] : '';
    }
    this.showSelect = this.defaultSelect ? this.defaultSelect['province'] + ' - ' + this.defaultSelect['city'] : '';
  }

  /**
   * 城市联动二级
   */
  selectHandle(province: CityAddress, city: CityAddress) {
    // (this.defaultSelect);
    this.isExpand = false;
    this.showSelect = province + ' - ' + city;
    this.selected = {
      province: province,
      province_id: this.provinceId,
      city: city,
      city_id: this.cityId
    };
    this.result.emit(this.selected);
  }

  /**
   * 城市联动三级
   */
  selectHandleArea(province: CityAddress, city: CityAddress, district: CityAddress) {
    this.isExpand = false;
    this.showSelect = province + ' - ' + city + ' - ' + district;
    this.selected = {
      province: province,
      province_id: this.provinceId,
      city: city,
      city_id: this.cityId,
      district: district,
      district_id: this.districtId
    };
    this.result.emit(this.selected);
  }

}
