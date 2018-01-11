import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-seller-personal-layout',
  templateUrl: './seller-personal-layout.component.html',
  styleUrls: ['./seller-personal-layout.component.scss']
})
export class SellerPersonalLayoutComponent implements OnInit {

  form;
  onOff;

  constructor(public router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      type: new FormControl('0'),
      keyword: new FormControl('')
    })
  }

  onSubmit(form) {
    // 0为云集优服
    if (form.type === '0') {
      this.router.navigate(['/shop/index'], {
        queryParams: {keyword: form.keyword, page: 1},
        queryParamsHandling: 'merge'
      });
    }else if (form.type === '1') { // 1为云课堂
      this.router.navigate(['/lives/lives-search'], {
        queryParams: {keyword: form.keyword, page: 1},
        queryParamsHandling: 'merge'
      });
    }
  }

  // 消息中心高亮显示
  mailEven() {
    this.router.navigate(['/seller/personal/message'], {
      queryParams: {notice_type: '0'}
    });
  }

}
