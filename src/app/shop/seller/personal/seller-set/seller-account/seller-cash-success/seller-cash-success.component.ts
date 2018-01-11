import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DatetimeHelper} from '#{common}/helper/datetime-helper';
import {LocalStorageService} from '#{service}/local-storage.service';

@Component({
  selector: 'app-seller-cash-success',
  templateUrl: './seller-cash-success.component.html',
  styleUrls: ['./seller-cash-success.component.scss']
})
export class SellerCashSuccessComponent implements OnInit {

  users;
  companyType = this.localStorage.get('companyType');
  now = DatetimeHelper.toTimestamp(new Date());
  money = this.route.snapshot.queryParams['money'];
  constructor(public localStorage: LocalStorageService,
              public router: Router,
              public route: ActivatedRoute) { }

  ngOnInit() {
    if (this.companyType === '0') {
      this.users = 'buyer';
    }else if (this.companyType === '1') {
      this.users = 'seller'
    }
  }

}
