import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClientService} from '../../../service/http-client.service';
import {WechatComponent} from '../../../common/base/wechat-component';
import {Config} from '../../../config/config';

@Component({
  selector: 'app-wechat-set-info',
  templateUrl: './wechat-set-info.component.html',
  styleUrls: ['./wechat-set-info.component.scss']
})
export class WechatSetInfoComponent extends WechatComponent implements OnInit {
  imageDomain: string = Config.imageDomain;
  empowerURL = '/wechat-info';
  public params;
  public data;

  constructor(protected http: HttpClientService, private route: ActivatedRoute) {
    super(http);
    this.empowerData();
  }

  ngOnInit() {
  }

  // 获取授权数据
  empowerData() {
    this.http.get(this.empowerURL).subscribe(
      result => {
        this.data = result;
      },err=>{});
  }

}
