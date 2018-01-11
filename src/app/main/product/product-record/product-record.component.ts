import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../../service/product.service';
import {Config} from '../../../config/config';


@Component({
  selector: 'app-product-record',
  templateUrl: './product-record.component.html',
  styleUrls: ['./product-record.component.scss']
})
export class ProductRecordComponent implements OnInit {
  public record;
  public params;
  public currentPage = 1;
  public pagination;
  public productId = this.route.snapshot.params['id'];
  public productName = this.route.snapshot.queryParams['name'];

  constructor( private route: ActivatedRoute, private product: ProductService) {
    this.pagination = this.pagination || {};
  }

  ngOnInit() {
        this.params = {foundation_id: this.productId, page: this.currentPage, pageSize: Config.pageSize };
        this.product.getRecord(this.params).subscribe(
          res => {
            this.record = res['items'];
            this.pagination = res['_meta'];
          });
  }

  /**
   * 分页操作数据
   */
  paginate(e) {
    this.currentPage = e.page + 1;
        this.product.getRecord({
          page: this.currentPage,
          pageSize: Config.pageSize,
          foundation_id: this.productId
        }).subscribe(
          res => {
            this.record = res['items'];
          })
  }
}
