import {Component, OnInit} from '@angular/core';
import {HttpClientService} from '../../../service/http-client.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MainComponent} from "../../../common/base/main-component";
import {UsersService} from '../../../service/users.service';
import {Config} from '../../../config/config';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent extends MainComponent implements OnInit {


  public userId = this.route.snapshot.params['id'];//路由取参
  public params;
  public dataTracking;//跟踪记录数据列表
  public productId;//基金id
  public pagination; // 页码
  public showProduct: boolean;//查看投资产品弹框显示

  constructor(protected http: HttpClientService,
              private route: ActivatedRoute,
              private router: Router,
              private users: UsersService) {
    super(http);
    this.pagination = this.pagination || {};
  }

// tab标签
  public tabItems = [
    {title: '用户信息', url: '/main/users/info' + '/' + this.userId},
    {title: '历史投资记录', url: '/main/users/history' + '/' + this.userId},
    {title: '跟踪记录', url: '/main/users/tracking' + '/' + this.userId},
  ];

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.params = {
          page: params['page'],
          pageSize: Config.pageSize,
          kind: params['kind']
        };
        this.tracking();
      });
  }

  tracking() {
    const params = Object.assign({'user_id': this.userId}, this.params)
    this.users.tracking(params).subscribe(
      res => {
        this.dataTracking = res['items'];
        this.pagination = res['_meta'];
      });
  }


  /**
   * 分页操作数据
   * @param e
   */
  paginate(e) {
    this.router.navigate([this.router.url.split('?')[0]], {
      queryParams: {page: e.page + 1,},
      queryParamsHandling: 'merge'
    });
  }


  // 预约记录---投资产品查看弹框
  public product(id): void {
    this.productId = id;
    this.showProduct = true;
  };


  // 返回跳转
  public toInvestedUser() {
    this.router.navigate(['main/users/invested'])
  }

  // 关闭产品查看
  closeProduct(bool) {
    this.showProduct = bool;
  }


}
