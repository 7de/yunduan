import { Component, OnInit } from '@angular/core';
import {SiteService} from '#{service}/site.service';

@Component({
  selector: 'app-service-agreement',
  templateUrl: './service-agreement.component.html',
  styleUrls: ['./service-agreement.component.scss']
})
export class ServiceAgreementComponent implements OnInit {
  proNormData;
  constructor(private site: SiteService) { }

  ngOnInit() {
    this.site.getProtocol(7).subscribe(res => {
      this.proNormData = res;
    });
    window.scrollTo(0, 0);
  }

}
