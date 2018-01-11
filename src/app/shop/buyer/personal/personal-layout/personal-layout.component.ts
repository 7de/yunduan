import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-personal-layout',
  templateUrl: './personal-layout.component.html',
  styleUrls: ['./personal-layout.component.scss']
})
export class PersonalLayoutComponent implements OnInit {

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
    if (form.type === '0') {
      this.router.navigate(['/shop/index'], {
        queryParams: {keyword: form.keyword, page: 1},
        queryParamsHandling: 'merge'
      });
    }else if (form.type === '1') {
      this.router.navigate(['/lives/lives-search'], {
        queryParams: {key_words: form.keyword, page: 1},
        queryParamsHandling: 'merge'
      });
    }
  }

  // 消息中心高亮显示
  mailEven() {
    this.router.navigate(['/buyer/personal/message'], {
      queryParams: {notice_type: '0'}
    });
  }

}
