import {Component, Input, OnInit} from '@angular/core';
import {Config} from '#{config}/config';

@Component({
  selector: 'app-head-home',
  templateUrl: './head-home.component.html',
  styleUrls: ['./head-home.component.scss']
})
export class HeadHomeComponent implements OnInit {

  @Input() homeTitle;
  imageDomain: string = Config.imageDomain;
  constructor() { }

  ngOnInit() {
  }

}
