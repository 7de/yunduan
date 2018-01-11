import {Component, OnInit} from '@angular/core';
import {HttpClientService} from '../../../service/http-client.service';
import {Config} from '../../../config/config';
import {LocalStorageService} from '../../../service/local-storage.service';
const TEMPLATESt_URL = '/templates';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
  template;
  public params;
  public data;
  api: string = Config.apiDomain;
  constructor(private http: HttpClientService,
              private localStorage: LocalStorageService
              ) {
  }

  ngOnInit() {
    this.templates({});
    this.saveValue();
  }

  templates(params: Object) {
    Object.assign(params, {});
    this.http.get(TEMPLATESt_URL, params).subscribe(
      result => {
        this.template = result;
      });
  }


  saveValue() {
    this.localStorage.setObject('capacity', {'submitteds': true});
  }
}
