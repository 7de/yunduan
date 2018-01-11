import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Config} from '#{config}/config';
import {SiteService} from '#{service}/site.service';

@Component({
  selector: 'app-hot',
  templateUrl: './hot.component.html',
  styleUrls: ['./hot.component.scss']
})
export class HotComponent implements OnInit {

  params;
  hotList;
  constructor(public route: ActivatedRoute,
              private siteService: SiteService,) { }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.params = Object.assign(
          {
            page: params['page'],
            pageSize: Config.pageSize / 2,
            sort: '-pv'
          }
        );
        this.hot();
      });
  }

  hot() {
    this.siteService.newsList(this.params, {}).subscribe(
      res => {
        this.hotList = res['items'];
      }
    )
  }

}
