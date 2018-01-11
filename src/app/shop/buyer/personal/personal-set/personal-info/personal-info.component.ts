import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {

  tabClassName = 'custom-tabs-another';
  tabMenuClassName = 'custom-tab-cut';

  public tabItems = [
    {title: '基本信息设置', url: '/buyer/personal/set/info/information'},
    {title: '头像设置', url: '/buyer/personal/set/info/photo'}
  ];
  constructor(private router: Router) {
  }

  ngOnInit() {
  }
}
