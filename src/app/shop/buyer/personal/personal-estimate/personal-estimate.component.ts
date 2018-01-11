import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-estimate',
  templateUrl: './personal-estimate.component.html',
  styleUrls: ['./personal-estimate.component.scss']
})
export class PersonalEstimateComponent implements OnInit {

  tabClassName = 'custom-tabs-another custom-tabs-sub_another';

  // 基金公司===我的评价
  public tabItems = [
    {title: '我的评价', url: './self'},
    {title: '来自服务商的评价', url: './other'},
  ];
  constructor() { }

  ngOnInit() {
  }

}
