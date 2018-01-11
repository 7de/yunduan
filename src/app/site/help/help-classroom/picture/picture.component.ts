import { Component, OnInit } from '@angular/core';
import {Config} from '#{config}/config';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss']
})
export class PictureComponent implements OnInit {
  imageDomain: string = Config.imageDomain;
  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

}
