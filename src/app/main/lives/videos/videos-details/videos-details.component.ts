import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VideoService} from '#{service}/lives/video.service';
import {Config} from '#{config}/config';
import {LocalStorageService} from '#{service}/local-storage.service';

@Component({
  selector: 'app-videos-details',
  templateUrl: './videos-details.component.html',
  styleUrls: ['./videos-details.component.scss']
})
export class VideosDetailsComponent implements OnInit {

  params: any;
  pagination: any;
  public id = this.route.snapshot.queryParams['id'];
  public commentParams: Object = {
    media_type: 0,
    content_id: this.route.snapshot.queryParams['id']
  }
  public videoData;
  public videoList;
  public companyInfo = this.localStorage.getObject('currentCompany');

  constructor(private videoService: VideoService,
               private route: ActivatedRoute,
               private localStorage: LocalStorageService,
               private router: Router) { }

  ngOnInit() {
    this.getSingleVideoInfo();
    this.addPlayCount();
    window.scrollTo(0, 0);
  }

  /**
   * 获取视频信息
   */
  getSingleVideoInfo() {
    this.videoService.getVideoInfo(this.id).subscribe(
      res => {
        this.videoData = res;
        // console.log(this.videoData);
        this.getVideoList(res['media_id']);
      });
  }

  /**
   * 增加播放量
   */
  addPlayCount() {
    this.videoService.addPlayCounts(this.id).subscribe(
      res => {
        // console.log('ok'+res);
      },
      error => {
        // console.log('no'+error);
      });
  }

  /**
   * 获取视频列表
   */
  getVideoList(media_id) {
    let obj = { pageSize: 5, media_id: media_id, exclude_id: this.id, expand: 'media_info' };
    this.videoService.getVideosList(obj).subscribe(
      res => {
        this.videoList = res['items'];
      });
  }

  /**
   * 点击侧边
   * @param id
   */
  refreshData(id) {
    this.commentParams = {
      content_id: id,
      media_type: 0,
      page: 1,
      pageSize: Config.pageSize
    };
    this.router.navigate([this.router.url.split('?')[0]], {
      queryParams: {
        id: id,
        page: 1,
      }
    });
    this.id = id;
    this.addPlayCount();
    this.getSingleVideoInfo();
  }
}
