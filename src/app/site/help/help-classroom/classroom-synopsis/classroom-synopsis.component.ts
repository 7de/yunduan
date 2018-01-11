import { Component, OnInit } from '@angular/core';
import {Config} from '#{config}/config';

@Component({
  selector: 'app-classroom-synopsis',
  templateUrl: './classroom-synopsis.component.html',
  styleUrls: ['./classroom-synopsis.component.scss']
})
export class ClassroomSynopsisComponent implements OnInit {
  imageDomain: string = Config.imageDomain;
  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

}
