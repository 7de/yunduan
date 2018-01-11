import { Component, OnInit } from '@angular/core';
import {SiteService} from '#{service}/site.service';

@Component({
  selector: 'app-service-specification',
  templateUrl: './service-specification.component.html',
  styleUrls: ['./service-specification.component.scss']
})
export class ServiceSpecificationComponent implements OnInit {
  proNormData;
  constructor(private site: SiteService) { }

  ngOnInit() {
    this.site.getProtocol(8).subscribe(res => {
      this.proNormData = res;
    });
    window.scrollTo(0, 0);
  }

}
