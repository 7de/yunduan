import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-seller-personal-home',
  templateUrl: './seller-personal-home.component.html',
  styleUrls: ['./seller-personal-home.component.scss']
})
export class SellerPersonalHomeComponent implements OnInit {

  tabClassName = 'custom-tabs-another';

  // 服务商===我的评价
  public tabItems = [
    {title: '首页', url: './index'},
    {title: '消息中心', url: './message'},
    {title: '设置', url: './set'},
  ];
  constructor(private router: Router) { }

  ngOnInit() {
  }

  // 消息中心高亮显示
  mailEven() {
    this.router.navigate(['/seller/personal/message'], {
      queryParams: {notice_type: '0'}
    });
  }


}
