import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {DatetimeHelper} from '../../common/helper/datetime-helper';
import {Subscription} from 'rxjs/Subscription';
import * as moment from 'moment';
// declare let moment: any;
moment.locale('zh-cn');

@Component({
  selector: 'app-countdown',
  template: `
    <span>
      {{text}}
    </span>
  `,
  styles: []
})
export class CountdownComponent implements OnInit {
  text;

  @Input() timestamp; // 倒计时时间差（时间戳格式）
  @Output() timesResult = new EventEmitter(); // 倒计时结束
  subscription: Subscription;

  constructor() {
  }

  ngOnInit() {
    this.sendCodeTimer();
  }

  /**
   * 倒计时
   */
  sendCodeTimer() {
    let seconds = this.timestamp;
    let timer = Observable.timer(0, 1000);
    this.subscription = timer.subscribe(t => {
      if (seconds) {
        seconds -= t/1000;
        this.text = DatetimeHelper.diffTime(seconds - t);
      } else {
        this.timesResult.emit(true);
        this.subscription.unsubscribe(); // 取消订阅
      }
    });
  }

}
