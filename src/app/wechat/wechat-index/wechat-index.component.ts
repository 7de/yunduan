import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClientService} from '../../service/http-client.service';
import {WechatComponent} from '../../common/base/wechat-component';
import {FlashMessagesService} from '#{service}/flash-messages.service';

// import {LocalStorageService} from '../../service/local-storage.service';


@Component({
  selector: 'app-wechat-index',
  templateUrl: './wechat-index.component.html',
  styleUrls: ['./wechat-index.component.scss']
})
export class WechatIndexComponent extends WechatComponent implements OnInit {


  private indexUrl = '/rate/info';
  public params;
  public data;

  constructor(private router: ActivatedRoute,
              protected http: HttpClientService,
              private flashMessages: FlashMessagesService
              // private localStorage: LocalStorageService
  ) {
    super(http);
  }

  ngOnInit() {
    this.router
      .queryParams
      .subscribe(params => {
          this.index();
        }
      );
  }

  // 获取数据
  index() {
    const params = Object.assign({}, this.params);
    return this.http.get(this.indexUrl, params).subscribe(
      result => {
        this.data = result;
      },
      error => {
        // this.flashMessages.wechaterr('修改失败！' + error);
      }
    );
  }
}
