import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClientService} from '../../../service/http-client.service';
import {ObjectHelper} from '../../../common/helper/object-helper';
import {MainComponent} from '../../../common/base/main-component';
import {FormControl, FormGroup} from '@angular/forms';
import {FlashMessagesService} from '../../../service/flash-messages.service';
import {ProductService} from '../../../service/product.service';
import {Config} from '../../../config/config';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']

})
export class ProductViewComponent extends MainComponent implements OnInit {
  objectHelper: ObjectHelper = new ObjectHelper();
  productData;

  // 折线图参数
  dataAll: any;
  incomes;
  currentPage = 1;
  pagination;
  select = 0;
  input = 0;
  subscribeHeight; // 认购费高度
  purchaseHeight; // 申购费高度
  sellHeight; // 赎回费高度

  productId = this.route.snapshot.params['id'];
  productName = this.route.snapshot.queryParams['name'];
  private allUrl = '/income/' + this.productId;

  constructor(protected http: HttpClientService, private route: ActivatedRoute, private flashMessages: FlashMessagesService, private productService: ProductService) {
    super(http);
    this.pagination = this.pagination || {};
  }

  ngOnInit() {
    this.load();

    // 历史净值
    this.productService.getIncomes({
      foundation_id: this.productId,
      page: this.currentPage,
      pageSize: Config.pageSize
    }).subscribe(
      res => {
        this.incomes = res['items'];
        this.pagination = res['_meta'];
      });

    // 查看数据追踪
    this.productService.getView(this.productId, {}).subscribe(res => {
      this.productData = res;
      if (this.productData.showFee.subscribe_fee) {
        this.subscribeHeight = 45 * ((this.productData.showFee.subscribe_fee).length + 1);
        this.purchaseHeight = 45 * ((this.productData.showFee.purchase_fee).length + 1);
        this.sellHeight = 45 * ((this.productData.showFee.sell_fee).length + 1);
      } else {
        this.subscribeHeight = 45 * 2;
        this.purchaseHeight = 45 * 2;
        this.sellHeight = 45 * 2;
      }
    })
  }

  /**
   * 分页操作数据
   */
  paginate(e) {
    this.currentPage = e.page + 1;
    this.productService.getIncomes({
      page: this.currentPage,
      pageSize: Config.pageSize,
      foundation_id: this.productId
    }).subscribe(
      res => {
        this.incomes = res['items'];
        this.pagination = res['_meta'];
      })
  }

  load() {
    this.line({index: 0});
  }

  line(event) {
    return this.http.get(this.allUrl, {time: event.index + 1}).subscribe(
      result => {
        let paramsData = result;
        let date = this.objectHelper.getFields(paramsData, 'date');
        let value = this.objectHelper.getFields(paramsData, 'average');
        // 折线图参数
        this.dataAll = {
          labels: date,
          datasets: [
            {
              label: this.productName,
              data: value,
              fill: false,
              borderColor: '#aa2426'
            }
          ]
        };
      });
  }

  /**
   * 风险等级
   */
  getRisk(risk) {
    if (risk) {
      switch (risk) {
        case 1:
          return '高风险';
        case 2:
          return '较高风险';
        case 3:
          return '中等风险';
        case 4:
          return '较低风险';
        default:
          return '低风险';
      }
    }
  }

  /**
   * 产品类型
   */
  getProduct(type) {
    if (type) {
      switch (type) {
        case 1:
          return '证券';
        case 2:
          return '股权';
        case 3:
          return '创业';
        default:
          return '其他';
      }
    }
  }

}
