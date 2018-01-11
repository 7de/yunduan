import { Component, OnInit } from '@angular/core';
import {VideoService} from '#{service}/lives/video.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PictureService} from '../../../service/lives/picture.service';

@Component({
  selector: 'app-lives-home',
  templateUrl: './lives-home.component.html',
  styleUrls: ['./lives-home.component.scss']
})
export class LivesHomeComponent implements OnInit {

  public livesBg = '/upload/frontend/20171110/6cc50bd21bfe5c3b2556eeba6e674123.png';
  public id = this.route.snapshot.queryParams['id'];
  public allData;
  public serialData = [];
  public videosData = [];
  public picturesData = [];
  public allBool = {
    'serial': true,
    'videos': true,
    'pictures': true
  };
  public hoverObj = {};

  constructor(private videoService: VideoService,
              private pictureService: PictureService,
              private route: ActivatedRoute,
              private router: Router) { }


  ngOnInit() {
    window.scrollTo(0, 0);
    this.getLivesInfo();
  }

  /**
   * 获取课堂信息
   */
  getLivesInfo (status?) {
    this.videoService.getHotLivesInfo(this.id).subscribe(
      res => {
        this.allData = res;
        switch (status) {
          case 'serial':
            this.allBool['serial'] = true;
            this.serialData = [];
            this.serialData = res['index_list']['media_info_list'];
            break;
          case 'videos':
            this.allBool['videos'] = true;
            this.videosData = [];
            this.videosData = res['index_list']['media_video_list'];
            break;
          case 'pictures':
            this.allBool['pictures'] = true;
            this.picturesData = [];
            this.picturesData = res['index_list']['media_article_list'];
            break;
          default:
            this.serialData = res['index_list']['media_info_list'];
            this.videosData = res['index_list']['media_video_list'];
            this.picturesData = res['index_list']['media_article_list'];
            break;
        }
      });
  }

  /**
   * 获取连载列表
   */
  getAllSerial() {
    // console.log(this.serialData);
    let obj = {media_author_id: this.id, pageSize: 0};
      this.videoService.getSerialList(obj).subscribe(
        res => {
          this.serialData = [];
          this.serialData = res['items'];
          // console.log(this.serialData);
          this.allBool['serial'] = false;
        });
  }

  /**
   * 获取视频列表
   */
  getAllVideos() {
    let obj = {media_author_id: this.id, pageSize: 0};
      this.videoService.getVideosList(obj).subscribe(
        res => {
          this.videosData = [];
          this.videosData = res['items'];
          this.allBool['videos'] = false;
        });
  }

  /**
   * 获取图文列表
   */
  getAllPictures() {
    let obj = {media_author_id: this.id, pageSize: 0};
    this.pictureService.getPicList(obj).subscribe(
      res => {
        this.picturesData = [];
        this.picturesData = res['items'];
        this.allBool['pictures'] = false;
      });
  }


  linkToIndex(type, id) {
    if (type === 0) {
      this.router.navigate(['/lives/videos-index'], {queryParams: {id: id}});
    }else {
      this.router.navigate(['/lives/pictures-index', id]);
    }
  }

}
