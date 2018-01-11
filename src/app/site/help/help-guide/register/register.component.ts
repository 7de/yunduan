import { Component, OnInit } from '@angular/core';
import {SiteService} from '#{service}/site.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  proNormData;
  constructor(private site: SiteService) { }

  ngOnInit() {
    this.site.getProtocol(1).subscribe(res => {
      this.proNormData = res;
    });
    window.scrollTo(0, 0);
  }

}
