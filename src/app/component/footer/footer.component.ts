import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Config} from '#{config}/config';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input() bgc; // 1-白色 2-灰色
  imageDomain: string = Config.imageDomain;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  orderEven() {
    this.router.navigate(['/shop'], {
      queryParams: {demand_category_id: '1'}
    });
    window.scrollTo(0, 0);
  }
  scroll() {
    window.scrollTo(0, 0);
  }
}
