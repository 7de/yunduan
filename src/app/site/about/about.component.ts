import {Component, OnInit} from '@angular/core';
import {Config} from '#{config}/config';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  imageDomain: string = Config.imageDomain;

  constructor() {
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }


}
