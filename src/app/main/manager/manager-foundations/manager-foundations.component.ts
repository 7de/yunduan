import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ManagerService} from '../../../service/manager.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Config} from '../../../config/config';
import {ConfirmationService} from 'primeng/components/common/confirmationservice';
import {HttpClientService} from '../../../service/http-client.service';
import {FlashMessagesService} from 'app/service/flash-messages.service';
import {ValidDetails} from '../../../common/shared/validator';

const URL = '/foundations';
const MANGER_URL = '/managers';

@Component({
  selector: 'app-manager-foundations',
  templateUrl: './manager-foundations.component.html',
  styleUrls: ['./manager-foundations.component.scss']
})
export class ManagerFoundationsComponent implements OnInit {

  public products: Array<any> = [];
  public params; // 保存页面url参数
  public pagination;

  public product; // 产品

  public managers: Array<any> = [];

  associationForm: FormGroup;

  public show = false;

  constructor(protected http: HttpClientService,
              private route: ActivatedRoute,
              private router: Router,
              private managerService: ManagerService,
              private flashMessages: FlashMessagesService) {
    this.pagination = this.pagination || {};
  }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.params = {page: params['page'], pageSize: Config.pageSize};
        this.index();
      });
    this.getManagers({});
  }

  index() {
    const id = this.route.snapshot.queryParams['id']; // 获取参数
    this.managerService.getManagerFoundations(id, Object.assign({}, this.params, {expand: 'percent,income,profile'})).subscribe(
      res => {
        this.products = res['items'];
        this.pagination = res['_meta'];
      });
  }

  /**
   * 分页操作数据
   */
  paginate(e) {
    this.router.navigate([this.router.url.split('?')[0]], {
      queryParams: {page: e.page + 1},
      queryParamsHandling: 'merge'
    })
  }

  /**
   * 请求基金经理name
   */
  getManagers(params: Object) {
    Object.assign(params, {});
    this.http.get(MANGER_URL, params).subscribe(
      result => {
        this.managers = result['items'];
      })
  }

  /**
   * 解除
   */
  disAssociated(product) {
    this.associationForm = new FormGroup({
      manager_id: new FormControl('', [ValidDetails])
    });
    this.product = product;
  }


  /**
   * 解除关联产品操作
   */
  onSubmit(form, params: Object) {
    Object.assign(params, {'manager_id': form.value.manager_id});
    this.http.put(URL + '/' + this.product.id, params).subscribe(
      res => {
        // //;(res);
        // 解除关联产品后刷新
        this.index();
        this.show = !this.show;
        this.flashMessages.wechatprompt('成功解除关联产品！');
      }
    );
  }
}
