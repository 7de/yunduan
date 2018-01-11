import {Component, OnInit} from '@angular/core';
import {VideoService} from '#{service}/lives/video.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PictureService} from '#{service}/lives/picture.service';

@Component({
  selector: 'app-lives-search',
  templateUrl: './lives-search.component.html',
  styleUrls: ['./lives-search.component.scss']
})
export class LivesSearchComponent implements OnInit {

  public serialData = []; // 连载数据
  public videosData = [];
  public picturesData = [];
  public livesData = [];
  public keyword;
  public searchAllBool;
  params: {};
  pagination: any;
  public kind;
  public noDataBool = false;
  public hoverBool = {};

  constructor(private videoService: VideoService,
              private pictureService: PictureService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    let pageSize = this.kind === 'lives' ? 16 : 15;
    this.route.queryParams.subscribe(params => {
      this.params = Object.assign({},
        {
          page: params['page'],
          pageSize: pageSize,
          keyword: params['keyword']
        });
      this.kind = params['kind'];

      switch (params['kind']) {
        case 'serial':
          this.getSerialData();
          break;
        case 'videos':
          this.getVideosData();
          break;
        case 'pictures':
          this.getPicturesData();
          break;
        case 'lives':
          this.getLivesData();
          break;
        default:
          this.getSearchAll();
          break;
      }
    });
  }


  /**
   * 获取搜索结果
   */
  getSearchAll() {
    let keyword = this.params && this.params['keyword'] ? this.params['keyword'] : '';
    this.videoService.searchAllLives(keyword).subscribe(
      res => {
        this.serialData = res['album'];
        this.videosData = res['video'];
        this.picturesData = res['article'];
        this.livesData = res['author'];
        window.scrollTo(0, 0);
        if (!this.serialData.length && !this.videosData.length && !this.picturesData.length && !this.livesData.length) {
          this.noDataBool = true;
        }else {
          this.noDataBool = false;
        }
      });
  }

  /**
   * 点击获取连载列表
   */
  getSerialData() {
    this.videoService.getSerialList({title: this.keyword}, this.params).subscribe(
      res => {
        this.serialData = res['items'];
        this.pagination = res['_meta'];
        window.scrollTo(0, 0);
        if (!this.serialData.length) {
          this.noDataBool = true;
        }else {
          this.noDataBool = false;
        }
      });
  }

  /**
   *  点击获取课堂列表
   */
  getLivesData() {
    this.videoService.getHotLivesList({nickname: this.keyword}, this.params).subscribe(
      res => {
        this.livesData = res['items'];
        this.pagination = res['_meta'];
        window.scrollTo(0, 0);
        if (!this.livesData.length) {
          this.noDataBool = true;
        }else {
          this.noDataBool = false;
        }
      });
  }

  /**
   *  点击搜索视频列表
   */
  getVideosData() {
    this.videoService.getVideosList({title: this.keyword}, this.params).subscribe(
      res => {
        this.videosData = res['items'];
        this.pagination = res['_meta'];
        window.scrollTo(0, 0);
        if (!this.videosData.length) {
          this.noDataBool = true;
        }else {
          this.noDataBool = false;
        }
      });
  }

  /**
   * 点击搜索图文列表
   */
  getPicturesData() {
    Object.assign(this.params, {title: this.keyword});
    this.pictureService.getPicList(this.params).subscribe(
      res => {
        this.picturesData = res['items'];
        this.pagination = res['_meta'];
        window.scrollTo(0, 0);
        if (!this.picturesData.length) {
          this.noDataBool = true;
        }else {
          this.noDataBool = false;
        }
      });
  }


  linkToSerial(item) {
    if (item['media_type'] === 0) {
      this.router.navigate(['lives/videos-index'], {queryParams: {id: item['id']}});
    } else {
      this.router.navigate(['lives/pictures-index', item['id']]);
    }
  }

  linkAll(kind) {
    this.router.navigate([this.router.url.split('?')[0]], {
      queryParams: {
        kind: kind,
        page: 1,
      },
      // queryParamsHandling: 'merge'
    });
  }

  /**
   * 分页操作数据
   * @param e
   */
  paginate(e) {
    this.router.navigate([this.router.url.split('?')[0]], {
      queryParams: {
        kind: this.kind,
        page: e.page + 1,
      },
      queryParamsHandling: 'merge'
    });
  }

}
