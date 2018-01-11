import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClientService} from '../../../service/http-client.service';
import {MainComponent} from '../../../common/base/main-component';
import {DatetimeHelper} from '../../../common/helper/datetime-helper';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router, Data} from '@angular/router';
import {Config} from '../../../config/config';
import {ValidateNum, ValidDateTime, ValidDetails} from '../../../common/shared/validator';
import {UsersService} from '../../../service/users.service';

@Component({
  selector: 'app-create-invest',
  templateUrl: './create-invest.component.html',
  styleUrls: ['./create-invest.component.scss']
})
export class CreateInvestComponent extends MainComponent implements OnInit {
  products;
  @Input() userId;
  @Output() showEvent = new EventEmitter();


  public cn: object;
  public endTime: Data; // 到期时间
  public data;
  public formGroup;

  constructor(protected  http: HttpClientService, private router: Router, public  users: UsersService) {
    super(http);
  }

  ngOnInit() {
    this.cn = Config.calendarLocaleCN; // 转中文
    this.formGroup = new FormGroup({
      product_id: new FormControl('', [ValidDetails]),
      startTime: new FormControl('', [ValidDateTime]),
      endTime: new FormControl('', [ValidDateTime]),
      money: new FormControl('', [ValidateNum]),
    });
    this.data = this.data || false;
    this.products = this.products || {};
    this.index();
  }


  index() {
    const params = {pageSize: 100};
    return this.users.productValue(params).subscribe(
      result => {
        this.products = result;
      });
  }


  value(id) {
    const params = {'expand': 'percent,income,profile,newIncome,manager'};
    return this.users.productKind(id, params).subscribe(
      result => {
        this.data = result;
      });
  }

  /**
   * 添加投资记录
   * @param form
   * @returns {any}
   */
  onSubmit(form) {
    if (!form.valid) {
      return false;
    }

    const formValue = form.value;
    const params = {
      'user_id': this.userId,
      'foundation_id': formValue.product_id,
      'money': formValue.money,
      'order_time': DatetimeHelper.toTimestamp(formValue.startTime),
      'over_time': DatetimeHelper.toTimestamp(formValue.endTime)
    };
    this.users.investedAdd(params).subscribe(
      result => {
        this.cancel(0);
      });
  }

  diffDateTime(formValue) {
    if (formValue.startTime && formValue.endTime) {
      return DatetimeHelper.diff(formValue.startTime, formValue.endTime);
    }
  }

  cancel(ev) {
    this.showEvent.emit(ev);
  }
}
