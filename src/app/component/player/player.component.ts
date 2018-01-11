import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Config} from '../../config/config';
import {VgAPI} from 'videogular2/core';

@Component({
  selector: 'app-player',
  template: `
    <vg-player *ngIf="sources" (onPlayerReady)="onPlayerReady($event)">
      <vg-overlay-play></vg-overlay-play>
      <vg-buffering></vg-buffering>

      <vg-scrub-bar>
        <vg-scrub-bar-current-time></vg-scrub-bar-current-time>
        <vg-scrub-bar-buffering-time></vg-scrub-bar-buffering-time>
      </vg-scrub-bar>

      <vg-controls [vgAutohide]="true" [vgAutohideTime]="3">
        <vg-play-pause></vg-play-pause>
        <vg-playback-button></vg-playback-button>

        <vg-time-display vgProperty="current" vgFormat="mm:ss"></vg-time-display>

        <vg-scrub-bar style="pointer-events: none;"></vg-scrub-bar>

        <vg-time-display vgProperty="left" vgFormat="mm:ss"></vg-time-display>
        <vg-time-display vgProperty="total" vgFormat="mm:ss"></vg-time-display>

        <vg-mute></vg-mute>
        <vg-volume></vg-volume>

        <vg-fullscreen></vg-fullscreen>
      </vg-controls>

      <video #media [vgMedia]="media" id="singleVideo" preload="auto" crossorigin >
        <source *ngFor="let video of sources" [src]="video.src" [type]="video.type">
        <!--<source src="http://static.videogular.com/assets/videos/videogular.ogg" type="video/ogg">-->
        <!--<source src="http://static.videogular.com/assets/videos/videogular.webm" type="video/webm">-->

      </video>
    </vg-player>
  `,
  styles: []
})
export class PlayerComponent implements OnChanges {
  sources;
  data;
  api: VgAPI;

  @Input() video; // 视频播放地址


  constructor() {
  }

  onPlayerReady(api: VgAPI) {
    this.api = api;
    this.api.getDefaultMedia().subscriptions.ended.subscribe(
      () => {
        // Set the video to the beginning
        this.api.getDefaultMedia().currentTime = 0;
      }
    );
  }

  /**
   * 解决 previewImg 参数不更新
   * @param {SimpleChanges} changes
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['video'].currentValue) {
      this.data = changes['video'].currentValue;
      this.sources = [{
        src: Config.imageDomain + this.data,
        type: 'video/mp4'
      }];
    }
  }

}
