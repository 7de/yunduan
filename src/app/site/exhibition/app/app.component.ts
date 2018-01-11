import { Component, OnInit } from '@angular/core';
import {Config} from '#{config}/config';

@Component({
  selector: 'app-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  imageDomain: string = Config.imageDomain;
  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

}
