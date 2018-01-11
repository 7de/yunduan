import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageService} from '#{service}/local-storage.service';

@Component({
  selector: 'app-cash-success',
  templateUrl: './cash-success.component.html',
  styleUrls: ['../../../../../seller/personal/seller-set/seller-account/seller-cash-success/seller-cash-success.component.scss']
})
export class CashSuccessComponent implements OnInit {

  users;
  companyType = this.localStorage.get('companyType');
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
