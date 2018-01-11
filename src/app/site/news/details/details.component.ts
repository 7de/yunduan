import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Config} from '../../../config/config';
import {SiteService} from '../../../service/site.service';



@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  details;
  public idPrev;
  public idNext;
  public name;
  newsId = this.route.snapshot.params['id'];
  imageDomain: string = Config.imageDomain;
  constructor(private siteService: SiteService,
              private route: ActivatedRoute,
              public router: Router
  ) {
    this.name = 'news'
  }

  ngOnInit() {
    scroll(0, 0);
    this.route
      .queryParams
      .subscribe(params => {
        this.detailShowed();
      });
  }

  /**
   * 新闻正文
   * @param params
   */
   detailShowed() {
    this.siteService.newsDetails({}, this.newsId).subscribe(
      res => {
        this.details = res;
      }, err => {
      }
    )
   }

  /**
   * 上一条新闻
   */
  // prev () {
  //   this.idPrev = this.details.prevArticle['id'];
  //   this.router.navigateByUrl('/site/news/details?id=' + this.idPrev);
  //   window.scrollTo(0, 0);
  // }

  /**
   * 下一条新闻
   */
  // next () {
  //   this.idNext = this.details.nextArticle['id'];
  //   this.router.navigateByUrl('/site/news/details?id=' + this.idNext);
  //   window.scrollTo(0, 0);
  // }
}
