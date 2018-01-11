import {Component, OnInit} from '@angular/core';
import {HttpClientService} from '../../../service/http-client.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MainComponent} from '../../../common/base/main-component';
import {UsersService} from '../../../service/users.service';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.scss']
})
export class InfoUserComponent extends MainComponent implements OnInit {

  public userId = this.route.snapshot.params['id']; // 取路由里的参数
  public params;
  public data; // 用户信息接收数据
  public pagination; // 页码

  // 父级tab
  public tabItems = [
    {title: '用户信息', url: '/main/users/info' + '/' + this.userId},
    {title: '历史投资记录', url: '/main/users/history' + '/' + this.userId},
    {title: '跟踪记录', url: '/main/users/tracking' + '/' + this.userId},
  ];

  constructor(protected http: HttpClientService,
              private route: ActivatedRoute,
              private router: Router,
              public users: UsersService) {
    super(http)
  }

  ngOnInit() {

    this.route
      .queryParams
      .subscribe(params => {
        this.params = {};
        this.info();
      });
  }

  info() {
    this.users.infos(this.userId, this.params).subscribe(
      res => {
        this.data = res;
      }
    );
  }

  // 返回跳转

  public toInvestedUser() {
    this.router.navigate(['main/users/invested'])
  }

}
