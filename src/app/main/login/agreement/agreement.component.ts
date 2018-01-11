import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '#{service}/http-client.service';
import { Config } from '#{config}/config';
import { Headers } from '@angular/http';

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.scss']
})
export class AgreementComponent implements OnInit {
  public agreementData
  constructor(
    private http: HttpClientService,
  ) { }

  ngOnInit() {
    this.getAgreement().subscribe((result) => {
      this.agreementData = result;
    });
  }

  httpGet(url, params) {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    this.http.version = Config.mainApiVersion;
    return this.http.get(url, params, { headers: headers, withCredentials: true });
  }

  /**
   * 获取注册协议
   **/
  getAgreement() {
    return this.httpGet('/protocols/1', {})
  }

}
