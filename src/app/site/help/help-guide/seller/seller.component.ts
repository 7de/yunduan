import { Component, OnInit } from '@angular/core';
import {Config} from '#{config}/config';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})
export class SellerComponent implements OnInit {
  imageDomain: string = Config.imageDomain;
  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0);  }

}
