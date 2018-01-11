import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {EstimateService} from '#{service}/estimate.service';
import {FlashMessagesService} from '#{service}/flash-messages.service';
import {ValidDetails} from '#{common}/shared/validator';
import {Config} from '#{config}/config';

@Component({
    selector: 'app-estimate-seller',
    templateUrl: './estimate-seller.component.html',
    styleUrls: ['./estimate-seller.component.scss']
})
export class EstimateSellerComponent implements OnInit {

    public params;
    public sellerCompanyList;
    public pagination;
    public onOff = false;
    public currentReplying; // 当前回复
    public orderId; // 订单id
    public form;
    public estimateForm;
    public descriptionLength = 200;

    constructor(public route: ActivatedRoute,
                public router: Router,
                private estimate: EstimateService,
                private flashMessages: FlashMessagesService) {
        this.pagination = this.pagination || {};
    }

    ngOnInit() {
        this.form = new FormGroup({
            reply: new FormControl('', [ValidDetails])
        });
        this.estimateForm = new FormGroup({
          grade: new FormControl('')
        });
        this.load()
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
                this.sellerCompany();
            })
    }

    // 基金公司==商家的评价
    sellerCompany() {
        this.estimate.getSellerCompany(this.params).subscribe(
            res => {
                this.sellerCompanyList = res['items'];
                this.pagination = res['_meta'];
            }
        )
    }

    showReply(id) {
        this.orderId = id;
        if (this.currentReplying !== this.orderId && this.onOff) {
          this.onOff = true;
        } else {
          this.onOff = !this.onOff;
        }
        this.currentReplying = this.orderId;
    }

    onKeyup(event) {
        this.descriptionLength = 200 - (event.target.value.length);
    }


  cancel() {
        this.onOff = false;
        this.form.reset();
        this.descriptionLength = 200;
  }

  onChange(form) {
      this.router.navigate(['/buyer/personal/index/estimate/other'], {queryParams: {'grade': form.grade}})
  }

  onSubmit(form) {
    if (!form.valid) {
      return false;
    }
    const params = Object.assign({'comment_id': this.orderId, 'content': form.value.reply});
    this.estimate.replyToSeller(params).subscribe(
      res => {
        this.cancel();
        this.flashMessages.wechatprompt('回复成功！');
        this.load();
      }
    )
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
