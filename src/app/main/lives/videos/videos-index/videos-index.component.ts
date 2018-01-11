import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PictureService} from '../../../../service/lives/picture.service';
import {VideoService} from '../../../../service/lives/video.service';

@Component({
  selector: 'app-videos-index',
  templateUrl: './videos-index.component.html',
  styleUrls: ['./videos-index.component.scss']
})
export class VideosIndexComponent implements OnInit {

  public singleData;
  public videosList;
  private id = this.route.snapshot.queryParams['id'];
  public firstVideoId;
  params: any;
  pagination: any;
  public hoverObj = {};

  constructor(private pictureService: PictureService,
              private videoService: VideoService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.load();
    this.getVideoInfo();
  }

  load() {
    window.scrollTo(0, 0);
    this.route.queryParams.subscribe(params => {
      this.params = Object.assign(
        {
          page: params['page'],
          pageSize: 5
        });
      this.getVideoList();
    });
  }

  /**
   * 获取视频连载信息
   */
  getVideoInfo() {
    this.pictureService.getSerialInfo(this.id).subscribe(
      res => {
        this.singleData = res;
      });
  }

  /**
   * 获取视频列表
   */
  getVideoList() {
    let obj = {media_id: this.id, expand: 'media_info'};
    Object.assign(obj, this.params);
    this.videoService.getVideosList(obj).subscribe(
      res => {
        this.videosList = res['items'];
        this.firstVideoId = res['items'][0]['id'];
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

  /**
   * 跳转播放视频
   * @param id
   */
  playVidedo(id) {
    this.router.navigate(['lives/videos-details'], {queryParams: {id: id}});
  }
}
