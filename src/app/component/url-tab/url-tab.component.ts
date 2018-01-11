import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-url-tab',
  templateUrl: './url-tab.component.html',
  styleUrls: ['./url-tab.component.scss']
})
export class UrlTabComponent implements OnInit {

  @Input() items: Object; // @Input 用于接收父级组建属性
  @Input() className: string;

  constructor() {
  }

  ngOnInit() {
  }
}
