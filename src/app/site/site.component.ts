import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {
  public name
  public urls = this.router.url.match(/^\/site\/home$/);
  constructor(public router: Router) { }

  ngOnInit() {
  }

  onActivate(component) {
    this.name = component['name'] || ''
  }

}
