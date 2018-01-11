import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Config } from '#{config}/config';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AudioPlayerComponent implements OnChanges {

  public sources: Object
  @Input() src

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    this.sources = null
    if (changes['src'].currentValue) {
      this.sources = [{
        src: Config.imageDomain + changes['src'].currentValue,
        type: 'audio/mp3'
      }]
    }
  }
}
