import { Component } from '@angular/core';
import {Config} from '#{config}/config';

@Component({
  selector: 'app-register-header',
  templateUrl: './register-header.component.html',
  styleUrls: ['./register-header.component.scss']
})
export class RegisterHeaderComponent {
  imageDomain: string = Config.imageDomain;
  constructor() { }
}
