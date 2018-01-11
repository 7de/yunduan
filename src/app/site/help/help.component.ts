import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Config} from '#{config}/config';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  imageDomain: string = Config.imageDomain;

  constructor() {
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }


}
