import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {Config} from '#{config}/config';

@Component({
  selector: 'app-heads-shop',
  templateUrl: './heads-shop.component.html',
  styleUrls: ['./heads-shop.component.scss']
})
export class HeadsShopComponent implements OnInit {

  @Input() shopTitle;
  @Input() shopId;
  // @Output() search = new EventEmitter();
  form;
  imageDomain: string = Config.imageDomain;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      keyword: new FormControl('')
    })
  }

  onSubmit(form) {
    // this.router.navigate([this.router.url.split('?')[0]], {
    //   queryParams: {keyword: form.keyword, page: 1},
    //   queryParamsHandling: 'merge'
    // });
    this.router.navigate(['/shop/index'], {
      queryParams: {keyword: form.keyword, page: 1},
      queryParamsHandling: 'merge'
    });
  }

}
