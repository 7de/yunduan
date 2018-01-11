import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CompanyService} from '../../service/company.service';
import {Observable} from 'rxjs/Observable';
import {Config} from '../../config/config';
import {Router} from '@angular/router';
import {HttpClientService} from '../../service/http-client.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit, OnDestroy {
  @Input() title: string;
  @Input() goBackTag: string;
  unread;
  company;
  private NOTICES_COUNT_URL = '/notices/count';
  private timer: any;

  constructor(private companyService: CompanyService,
              protected http: HttpClientService,
              private router: Router) {
  }

  ngOnInit() {
    this.companyService.getCompany().subscribe(
      res => this.company = res
    );
    this.getNoticesCount();
  }

  ngOnDestroy() {
    if (this.timer) {
      this.timer.unsubscribe();
    }
  }

  /**
   * 定时更新通知个数
   * @returns {string}
   */
  getNoticesCount() {
    this.timer = Observable.timer(0, 5000).subscribe(() => {
      // 只有在 main 模块下才执行定时更新通知个数
      this.http.version = Config.mainApiVersion;
      this.http.get(this.NOTICES_COUNT_URL, {has_read: 0}).subscribe(
        result => {
          this.unread = result;
        }
      );
    });
  }
}
