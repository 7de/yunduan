import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import {HttpClientService} from '../../../service/http-client.service';
import {MainComponent} from "../../../common/base/main-component";
import {UsersService} from '../../../service/users.service';

@Component({
  selector: 'app-check-product',
  templateUrl: './check-product.component.html',
  styleUrls: ['./check-product.component.scss']
})
export class CheckProductComponent extends MainComponent implements OnInit {
  @Input() productId;
  @Output() showProduct = new EventEmitter();

  public params;
  public dataProduct;//基金产品数据

  constructor(protected http: HttpClientService, public users: UsersService) {
    super(http)
  }

  ngOnInit() {
    this.productCheck();
  }

  // 预约记录产品查看===发送get请求
  productCheck() {
    const params = Object.assign(
      {'expand': 'percent,income,profile,newIncome,manager'},
      this.params
    );
    this.users.productCheck(this.productId, params).subscribe(
      result => {
        this.dataProduct = result;
      });
  }


  cancel() {
    this.showProduct.emit(false);
  }

}
