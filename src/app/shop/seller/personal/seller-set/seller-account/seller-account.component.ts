import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller-account',
  templateUrl: './seller-account.component.html',
  styleUrls: ['../../../../buyer/personal/personal-set/personal-account/personal-account.component.scss']
})
export class SellerAccountComponent implements OnInit {

  public tabItems = [
    {title: '我的钱包', url: '/seller/personal/set/account/wallet'},
    {title: '修改支付密码', url: '/seller/personal/set/account/modify'},
    {title: '忘记支付密码', url: '/seller/personal/set/account/reset'}
  ];
  constructor() { }

  ngOnInit() {
  }

}
