import {Component, OnInit} from '@angular/core';
import {Config} from '../../config/config';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  webHomeApi: string = Config.homepageDomain;
  constructor() {
  }

  ngOnInit() {

  }


}
