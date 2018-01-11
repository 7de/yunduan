import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PictureService } from '#{service}/lives/picture.service';
import { Config } from '#{config}/config';

@Component({
  selector: 'app-pictures-voice',
  templateUrl: './pictures-voice.component.html',
  styleUrls: ['./pictures-voice.component.scss']
})
export class PicturesVoiceComponent implements OnInit {
  public data
  public picList
  public commentParams
  constructor(
    private route: ActivatedRoute,
    private ApiService: PictureService
  ) { }

  ngOnInit() {
    const { params } = this.route
    params.subscribe(params => {
      this.commentParams = {
        content_id: params.id,
        media_type: 1,
        page: 1,
        pageSize: Config.pageSize
      }
      this.ApiService.getPictureDetail(
        params.id,
        { expand: 'media_info,media_author' }
      ).subscribe(res => {
        this.data = res
        this.ApiService.getPicList({ media_id: res['media_id'], pageSize: 6}).subscribe(res => {
          // console.log(res)
          this.picList = res['items']
        })
      });
      // 增加音频播放量
      // addVideoCount(params.id) {
      this.ApiService.addPlayCounts(params.id).subscribe(
        res => {}
      );
      // }
    })
  }
}


