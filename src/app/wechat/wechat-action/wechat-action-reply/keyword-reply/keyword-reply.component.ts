import {Component, OnInit} from '@angular/core';
import {HttpClientService} from '../../../../service/http-client.service';
import {WechatComponent} from '../../../../common/base/wechat-component';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationService} from 'primeng/components/common/confirmationservice';
import {FormControl, FormGroup} from '@angular/forms';
import {FlashMessagesService} from '../../../../service/flash-messages.service';
@Component({
  selector: 'app-keyword-reply',
  templateUrl: './keyword-reply.component.html',
  styleUrls: ['./keyword-reply.component.scss']
})
export class KeywordReplyComponent extends WechatComponent implements OnInit {
  // 获取配置变量
  private getUrl = '/keyword-msgs';
  params;
  data;
  pagination;
  public formGroup;
  search;
  pageErr: boolean = false; // 未授权


  constructor(private router: Router, private route: ActivatedRoute, protected http: HttpClientService, private confirmationService: ConfirmationService, private flashMessages: FlashMessagesService) {
    super(http);
    this.pagination = this.pagination || {};
  }

  ngOnInit() {


    this.formGroup = new FormGroup({
      search: new FormControl(''),
    });

    this.route
      .queryParams
      .subscribe(params => {
        this.formGroup.setValue({
          search:params['search'] || '',
        });
        this.params = Object.assign({page: params['page']},this.formGroup.value);
        this.init();
      });

  }

  // 页面初始化
  init() {
    this.getData();
  }

  keywordSubmit(form) {
    if (!this.formGroup.get('search').value) {
      this.flashMessages.wechattip('请输入搜索关键词');
    }
    this.search = form.search;
    this.router.navigate(['/wechat/wechat-action/reply/reply-index/keyword'], {queryParams: {'search': (this.search).replace(/\s+/g,"")}});
  }

  // 获取关键词组列表
  getData() {
    const params = Object.assign({expand: 'message,keywords', pageSize: 3, page: 1}, this.params);
    return this.http.get(this.getUrl, params).subscribe(
      result => {
        this.data = result;
        this.pagination = this.data._meta;
      },error => {
        if (error === '公众号未授权') {
          this.pageErr = true;
        }
      });
  }

  // 删除
  delItem(id) {
    this.confirmationService.confirm({
      icon: 'fa-exclamation-circle',
      header: '温馨提示',
      message: '请确定是否删除该内容？',
      accept: () => {
        this.http.delete(this.getUrl + '/' + id).subscribe(
          result => {
            this.init()
          });
      }
    });
  }

  /**
   * 翻页方法
   * @param page
   */
  // changePage(page) {
  //   this.router.navigate([this.router.url.split('?')[0]], {
  //     queryParams: {page: page, search: this.search},
  //     queryParamsHandling: 'merge'
  //   })
  // }

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
