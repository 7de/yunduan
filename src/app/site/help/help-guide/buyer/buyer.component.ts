import { Component, OnInit } from '@angular/core';
import {Config} from '#{config}/config';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.scss']
})
export class BuyerComponent implements OnInit {
  imageDomain: string = Config.imageDomain;
  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

}
