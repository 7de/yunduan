import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {SiteService} from '#{service}/site.service';
import {Config} from '#{config}/config';

@Component({
  selector: 'app-heads',
  templateUrl: './heads.component.html',
  styleUrls: ['./heads.component.scss']
})
export class HeadsComponent implements OnInit {

  @Input() name;
  imageDomain: string = Config.imageDomain;

  onOff;
  upDown;
  constructor(
    private router: Router,
    public site: SiteService,
    private route: ActivatedRoute
  ) {
  }
  ngOnInit() {
  }
}
