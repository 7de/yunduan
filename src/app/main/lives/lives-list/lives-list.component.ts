import { Component, OnInit } from '@angular/core';
import {VideoService} from '#{service}/lives/video.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-lives-list',
  templateUrl: './lives-list.component.html',
  styleUrls: ['./lives-list.component.scss']
})
export class LivesListComponent implements OnInit {

  public livesBg = '/upload/frontend/20171111/77e80b7700de81c558c48276a2b9fdaa.png';
  public hotLivesData;
  params: any;
  pagination: any;

  constructor(private videoService: VideoService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.route.queryParams.subscribe(params => {
      this.params = Object.assign(
        {
          page: params['page'],
          pageSize: 15
        });
      this.getHotLives();
    });
  }
  /**
   * 获取热门课堂列表
   */
  getHotLives() {
    this.videoService.getHotLivesList(this.params).subscribe(
      res => {
        this.hotLivesData = res['items'];
        this.pagination = res['_meta'];
      });
  }

  /**
   * 分页操作数据
   * @param e
   */
  paginate(e) {
    this.router.navigate([this.router.url.split('?')[0]], {
      queryParams: {
        page: e.page + 1,
      },
      queryParamsHandling: 'merge'
    });
  }

}
