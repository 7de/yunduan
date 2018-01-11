import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {EstimateService} from '#{service}/estimate.service';
import {Config} from '#{config}/config';

@Component({
  selector: 'app-estimate-buyer',
  templateUrl: './estimate-buyer.component.html',
  styleUrls: ['./estimate-buyer.component.scss']
})
export class EstimateBuyerComponent implements OnInit {

  public params; // 参数
  public buyerCompanyList;
  public pagination; //  页码
  public estimateForm;

  constructor(public route: ActivatedRoute,
              public router: Router,
              private estimate: EstimateService) {
    this.pagination = this.pagination || {};
  }

  ngOnInit() {
    this.estimateForm = new FormGroup({
      grade: new FormControl('')
    });
    this.load();
  }

  load() {
    this.route
      .queryParams
      .subscribe(params => {
        this.params = Object.assign(
          {
            page: params['page'],
            pageSize: Config.pageSize,
            grade: params['grade']
          }
        );
        this.buyerCompany();
      })
  }

  // 基金公司===我的评价
  buyerCompany() {
    this.estimate.getBuyerCompany(this.params).subscribe(
      res => {
        this.buyerCompanyList = res['items'];
        this.pagination = res['_meta'];
      }
    )
  }

  onChange(form) {
    this.router.navigate(['/buyer/personal/index/estimate/self'], {queryParams: {'grade': form.grade}})
  }


  /**
   * 分页操作数据
   * @param e
   */
  paginate(e) {
    this.router.navigate([this.router.url.split('?')[0]], {
      queryParams: {
        'page': e.page + 1
      },
      queryParamsHandling: 'merge'
    });
    window.scroll(0, 0)
  }
}
