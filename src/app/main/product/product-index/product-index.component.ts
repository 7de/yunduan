import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../../service/product.service';
import {Config} from '../../../config/config';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ObjectHelper} from '../../../common/helper/object-helper';
import {LocalStorageService} from '../../../service/local-storage.service';
@Component({
  selector: 'app-product-index',
  templateUrl: './product-index.component.html',
  styleUrls: ['./product-index.component.scss'],
})
export class ProductIndexComponent implements OnInit {

  public params;
  public data;
  public pagination;
  public form;
  public kind;
  public tabItems = [
    {title: '全部', url: '/main/product/index', queryParams: {'kind': ''}},
    {title: '募集中', url: '/main/product/index', queryParams: {'kind': 1}},
    {title: '运行中', url: '/main/product/index', queryParams: {'kind': 0}},
    {title: '已清盘', url: '/main/product/index', queryParams: {'kind': 2}}
  ];

  constructor(private route: ActivatedRoute, private productList: ProductService,
              private localStorage: LocalStorageService,
              public router: Router) {
    this.pagination = this.pagination || {};
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required])
    });

    this.route
      .queryParams
      .subscribe(params => {
        this.form.setValue({
          name: params['name'] || '',
        });
        this.params = Object.assign({
          page: params['page'],
          pageSize: Config.pageSize,
          kind: params['kind'],
        }, this.form.value);
        this.kind = params['kind'];
        this.productList.getProductList(this.params).subscribe(
          res => {
            this.data = res['items'];
            this.pagination = res['_meta'];
          });
      });
    this.saveValue();
  }

  /**
   * 分页操作数据
   * @param e
   */

  paginate(e) {
    this.router.navigate([this.router.url.split('?')[0]], {
      queryParams: {
        page: e.page + 1,
      },
      queryParamsHandling: 'merge'
    });
  }

  saveValue() {
    this.localStorage.setObject('capacity', {'submitteds': true});
  }


  // 搜索按钮确定搜索加载页面===get请求
  public onSubmit(form) {
    let name = form.name;
    this.router.navigate(['/main/product/index'], {
      queryParams: {
        kind: this.kind,
        name: name ? name.replace(/\s+/g, '') : null,
      }
    });
  }
}
