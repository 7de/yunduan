import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Config} from '../../config/config';
import {SiteService} from '../../service/site.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  public name;
  newsList: any;
  public pagination;
  params;
  imageDomain: string = Config.imageDomain;

  constructor(
    private siteService: SiteService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.pagination = this.pagination || {};
    this.name = 'news'
  }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.params = Object.assign(
          {
             page: params['page'],
             pageSize: Config.pageSize / 2,
             category_id: params['category_id'],
          }
        );
        this.newsInfo();
      });
    window.scrollTo(0, 0);
  }

  /**
   * 新闻列表
   * @param params
   */
  newsInfo() {
    this.siteService.newsList(this.params, {}).subscribe(
      res => {
        this.newsList = res['items'];
        this.pagination = res['_meta']
      }
    )
  }

  /**
   * 分页操作数据
   * @param e
   */
  paginate(e) {
    this.router.navigate([this.router.url.split('?')[0]], {
      queryParams: {page: e.page + 1},
      queryParamsHandling: 'merge'
    });
    window.scrollTo(0, 0);
  }

}
