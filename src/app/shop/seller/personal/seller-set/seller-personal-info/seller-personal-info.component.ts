import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller-personal-info',
  templateUrl: './seller-personal-info.component.html',
  styleUrls: ['./seller-personal-info.component.scss']
})
export class SellerPersonalInfoComponent implements OnInit {

  tabClassName = 'custom-tabs-another';
  tabMenuClassName = 'custom-tab-cut';

  public tabItems = [
    {title: '基本信息', url: '/seller/personal/set/info/information'},
    {title: '编辑头像', url: '/seller/personal/set/info/photo'}
  ];
  constructor() { }

  ngOnInit() {
  }
}
