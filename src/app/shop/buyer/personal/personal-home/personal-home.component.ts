import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-personal-home',
  templateUrl: './personal-home.component.html',
  styleUrls: ['./personal-home.component.scss']
})
export class PersonalHomeComponent implements OnInit {
  // tabClassName = 'custom-tabs-another';
  //
  // // 基金公司===我的评价
  // public tabItems = [
  //   {title: '首页', url: './index'},
  //   {title: '订单管理', url: './order'},
  //   {title: '评价管理', url: './estimate'},
  //   {title: '消息中心', url: './message'},
  //   {title: '设置', url: './set'},
  // ];
  constructor(private router: Router) { }

  ngOnInit() {
  }

  // 订单管理tab高亮显示
  // orderEven() {
  //   this.router.navigate(['/buyer/personal/order'], {
  //     queryParams: {type: ''}
  //   });
  // }

  // // 消息中心高亮显示
  // mailEven() {
  //   this.router.navigate(['/buyer/personal/message'], {
  //     queryParams: {notice_type: '0'}
  //   });
  // }

}
