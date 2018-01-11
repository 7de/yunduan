import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FlashMessagesService } from '#{service}/flash-messages.service';
import { VideoService } from '#{service}/lives/video.service';
import { Config } from '#{config}/config';
import { LocalStorageService } from '#{service}/local-storage.service';

@Component({
  selector: 'app-pictures-comments',
  templateUrl: './pictures-comments.component.html',
  styleUrls: ['./pictures-comments.component.scss']
})
export class PicturesCommentsComponent implements OnChanges, OnInit {
  @Input() params;
  public loginInfo = Cookie.get('currentCompanyAuthorization');
  public loginBool: Boolean = false;
  public formComments: FormGroup;
  public commentsData;
  public pagination;
  public wordNum = 0;
  public companyInfo = this.localStorage.getObject('currentCompany');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private flashMessages: FlashMessagesService,
    private ApiService: VideoService,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit() {
    this.formComments = new FormGroup({
      commentsVal: new FormControl('', [Validators.required])
    });
    this.route.queryParams.subscribe(params => {
      this.getComments({
        page: params['page'] || 1,
        pageSize: Config.pageSize
      });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['params'].currentValue) {
      this.getComments(changes['params'].currentValue)
    }
  }

  /**
 * 获取评论列表
 */
  getComments(params = {}) {
    Object.assign(this.params, params);
    this.ApiService.getComments(this.params).subscribe(res => {
      this.commentsData = res['items'];
      this.pagination = res['_meta'];
    });
  }

  /**
   * 添加评论
   * @param form
   * @return {boolean}
   */
  onSubmit(form) {
    // console.log(form.valid);
    if (!form.valid) {
      return false;
    }
    if (!this.loginInfo) {
      this.loginBool = true;
    } else {
      let params = {
        media_type: this.params['media_type'],
        content_id: this.params['content_id'],
        content: form.value.commentsVal
      }
      this.ApiService.addComments(params).subscribe(
        res => {
          this.getComments();
          this.wordNum = 0
          this.formComments.get('commentsVal').reset()
          this.flashMessages.wechatprompt('评论成功');
        },
        error => {
          this.getComments();
          this.flashMessages.wechatprompt(error);
        });
    }
  }

  /**
   * 分页操作数据
   * @param e
   */
  paginate(e) {
    this.router.navigate([this.router.url.split('?')[0]], {
      queryParams: {
        page: e.page + 1,
      },
      queryParamsHandling: 'merge'
    });
  }

  /**
   * 计算输入的文本字数
   * @param ev
   */
  computerWord(ev) {
    let len = ev.target.value.length;
    if (len < 201) {
      this.wordNum = len;
    }
  }

  getDialog(e) {
    this.loginBool = e;
  }
}
