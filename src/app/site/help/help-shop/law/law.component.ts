import { Component, OnInit } from '@angular/core';
import {SiteService} from '#{service}/site.service';

@Component({
  selector: 'app-law',
  templateUrl: './law.component.html',
  styleUrls: ['./law.component.scss']
})
export class LawComponent implements OnInit {
  proNormData;
  constructor(private site: SiteService) { }

  ngOnInit() {
    this.site.getProtocol(9).subscribe(res => {
      this.proNormData = res;
    });
    window.scrollTo(0, 0);
  }

}
