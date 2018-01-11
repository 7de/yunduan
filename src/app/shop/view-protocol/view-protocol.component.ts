import {Component, Input, OnInit} from '@angular/core';
import {SiteService} from '#{service}/site.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-view-protocol',
  templateUrl: './view-protocol.component.html',
  styleUrls: ['./view-protocol.component.scss']
})
export class ViewProtocolComponent implements OnInit {
  agreementData;
  // @Input() agreementId: number;
  // @Input() agreementTitle;

  agreementId = Number(this.route.snapshot.queryParams['id']);
  agreementTitle = this.route.snapshot.queryParams['title'];

  constructor(private site: SiteService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.site.getProtocol(this.agreementId).subscribe(res => {
      this.agreementData = res;
    });
    window.scrollTo(0, 0);
  }

}
