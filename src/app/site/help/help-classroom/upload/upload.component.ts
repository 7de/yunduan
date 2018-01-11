import { Component, OnInit } from '@angular/core';
import {SiteService} from '#{service}/site.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  proNormData;
  constructor(private site: SiteService) { }

  ngOnInit() {
    this.site.getProtocol(11).subscribe(res => {
      this.proNormData = res;
  });
    window.scrollTo(0, 0);
  }

}
