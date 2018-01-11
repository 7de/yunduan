import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {CompanyService} from '../../service/company.service';
import {Router} from '@angular/router';
import {MessagesModule} from 'primeng/components/messages/messages';
import {HttpClientService} from '../../service/http-client.service';
import {Observable} from 'rxjs/Observable';
import {Config} from '../../config/config';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  
  constructor(private pageTitle: Title,
              private router: Router) {
  }

  ngOnInit() {
  }

  onActivate(component) {
    let title = component.pageTitle;
    if (!title) {
      title = '云端，一站式私募服务管理平台';
    }
    this.pageTitle.setTitle(title);
  }

  // 产品管理下级tab高亮显示
  productEven() {
    this.router.navigate(['/main/product/index'], {
      queryParams: {kind: ''}
    });
  }
}
