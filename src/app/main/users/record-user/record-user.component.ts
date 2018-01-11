import {Component, OnInit} from '@angular/core';
import {HttpClientService} from '../../../service/http-client.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MainComponent} from "../../../common/base/main-component";

@Component({
  selector: 'app-record-user',
  templateUrl: './record-user.component.html',
  styleUrls: ['./record-user.component.scss']
})
export class RecordUserComponent extends MainComponent implements OnInit {

  public appId = this.route.snapshot.queryParams['app_id'];//URL取参
  public userId = this.route.snapshot.queryParams['user_id'];//URL取参
  public recordUrl = '/track-records' + '?app_id=' + this.appId + '&user_id=' + this.userId; // 预约记录跟踪用户
  public params;
  public data;
  public pagination; // 页码


  constructor(protected http: HttpClientService, private route: ActivatedRoute, private router: Router) {
    super(http)
  }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.params = {page: params['page'], kind: params['kind']};
        this.record();
      });
  }

  // 已投资用户跟踪记录===get请求
  record() {
    const params = this.params;
    return this.http.get(this.recordUrl, params).subscribe(
      result => {
        this.data = result;
        this.pagination = this.data._meta;
      });
  }

}
