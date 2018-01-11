import { Component, OnDestroy, OnInit } from '@angular/core';
import { VideoService } from '#{service}/lives/video.service';
import { PictureService } from '#{service}/lives/picture.service';
import {Router} from '@angular/router';
import {Config} from '#{config}/config';

@Component({
  selector: 'app-lives-index',
  templateUrl: './lives-index.component.html',
  styleUrls: ['./lives-index.component.scss']
})
export class LivesIndexComponent implements OnInit, OnDestroy {
  public bannerData;
  public images;
  public hotData;
  public preferenceVideosData;
  public rawData;
  public hotVideosData;
  public preferencePicturesData;
  public investmentPicturesData;
  public hotPicturesData;
  public hoverAllBool = {};
  public hoverRawBool = {};
  public hoverHotBool = {};

  constructor(private videoService: VideoService,
    private ApiService: PictureService,
              private router: Router) {
  }

  ngOnInit() {
    this.getBannerPictures();
    this.getHotList();
    this.getPreferenceVideos();
    this.getRawVideos();
    this.getHotVideos();
    this.getPreferencePictures();
    this.getInvestmentPictures();
    this.getHotPictures();
    this.bannerData = this.bannerData || [];
    window.scrollTo(0, 0);
  }

  ngOnDestroy() {
  }

  /**
   * 获取banner图
   */
  getBannerPictures() {
    this.videoService.getBanner().subscribe(
      res => {
        this.images = res;
        this.bannerData = this.images.map((x) => {
          return {source: Config.imageDomain + x.img_path, alt: '', title: ''};
        });
      });
  }

  /**
   * 获取热门课堂
   */
  getHotList() {
    this.videoService.getHotLivesList({ pageSize: 5 }).subscribe(
      res => {
        // console.log(res);
        this.hotData = res['items']
      });
  }

  /**
   * 获取优选视频
   */
  getPreferenceVideos() {
    let obj = { sort: '-public_time', expand: 'media_info', pageSize: 4 };
    this.videoService.getVideosList(obj).subscribe(
      res => {
        this.preferenceVideosData = res['items'];
      });
  }

  /**
   * 获取法律视频
   */
  getRawVideos() {
    let obj = { info_type: '1', expand: 'media_info', pageSize: 4 };
    this.videoService.getVideosList(obj).subscribe(
      res => {
        this.rawData = res['items'];
      });
  }

  /**
   * 获取热门视频课程
   */
  getHotVideos() {
    let obj = { sort: '-pv', expand: 'media_info', pageSize: 5 };
    this.videoService.getVideosList(obj).subscribe(
      res => {
        this.hotVideosData = res['items'];
      });
  }

  /**
   * 获取优选图文
   */
  getPreferencePictures() {
    let obj = { sort: '-public_time', expand: 'media_info', pageSize: 4 };
    this.ApiService.getPicList(obj).subscribe(
      res => {
        this.preferencePicturesData = res['items'];
      });
  }

  /**
   * 获取投研图文
   */
  getInvestmentPictures() {
    let obj = { info_type: '2', expand: 'media_info', pageSize: 4 };
    this.ApiService.getPicList(obj).subscribe(
      res => {
        this.investmentPicturesData = res['items'];
        // console.log(this.investmentPicturesData);
      });
  }

  /**
   * 获取热门图文课程
   */
  getHotPictures() {
    let obj = { sort: '-pv', expand: 'media_info', pageSize: 5 };
    this.ApiService.getPicList(obj).subscribe(
      res => {
        this.hotPicturesData = res['items'];
      });
  }

  linkToVideo(id) {
    this.router.navigate(['/lives/videos-details'], {queryParams: {id: id}});
  }

  linkToPic(id) {
    // console.log(id);
    this.router.navigate(['/lives/pictures-detail', id]);
  }
}
