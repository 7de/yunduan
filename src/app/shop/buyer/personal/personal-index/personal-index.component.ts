import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageService} from '#{service}/local-storage.service';
import {HttpClientService} from '#{service}/http-client.service';
import {CompanyService} from '#{service}/company.service';
import {Config} from '#{config}/config';

@Component({
  selector: 'app-personal-index',
  templateUrl: './personal-index.component.html',
  styleUrls: ['./personal-index.component.scss']
})

export class PersonalIndexComponent implements OnInit {

  params;
  baseInfo;
  public companyType = this.localstorage.get('companyType');
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public localstorage: LocalStorageService,
    public http: HttpClientService,
    public company: CompanyService) { }

  ngOnInit() {
    this.load();
  }

  /**
   * 初始化加载页面
   */
  load() {
    this.route.queryParams.subscribe(params => {
      this.params = Object.assign(
        {
          page: params['page'],
          pageSize: Config.pageSize
        }
      );
    })
  };

  // 我的订单tab高亮显示
  orderEven() {
      this.router.navigate(['/buyer/personal/index/order'], {
          queryParams: {type: ''}
      });
  }
}
