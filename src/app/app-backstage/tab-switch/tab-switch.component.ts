import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-tab-switch',
  templateUrl: './tab-switch.component.html',
  styleUrls: ['./tab-switch.component.scss']
})
export class TabSwitchComponent implements OnInit {
  constructor(private pageTitle: Title) {
  }

  ngOnInit() {
  }

  onActivate(component) {
    let title = component.pageTitle;
    if (!title) {
      title = '云端，一站式私募服务管理平台';
    }
    this.pageTitle.setTitle(title);
  }
}
