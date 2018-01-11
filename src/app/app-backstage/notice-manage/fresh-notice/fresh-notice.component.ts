import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FlashMessagesService} from '../../../service/flash-messages.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Cookie} from 'ng2-cookies';
import {Config} from '#{config}/config';
import {HttpClientService} from '../../../service/http-client.service';
import {AppBackstageService} from '../../../service/app-backstage.service';

@Component({
  selector: 'app-fresh-notice',
  templateUrl: './fresh-notice.component.html',
  styleUrls: ['./fresh-notice.component.scss']
})
export class FreshNoticeComponent implements OnInit {
  editor;   // 文本编辑器
  noticeId; // 修改数据的id
  text: string;     // 编辑器的文本
  noticeForm: FormGroup;  // 表单
  api: string = Config.apiDomain;  // api图片地址
  public params;    // 参数
  public index = 0;
  public error = {};     // 错误文本的提示信息
  public imgSrc = '';    // 图片字符串
  public typeList = [{id: 1, name: '行业资讯'}, {id: 2, name: '公司动态'}];  // 公告类别数据
  umeditorConfig = Config.umeditorConfig;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClientService,
    private flashMessages: FlashMessagesService,
    private appBackstageService: AppBackstageService
  ) {}

  ngOnInit() {
    // subscribe参数订阅(公告管理详情id)
    this.route.queryParams.subscribe(
      params => {
        let id = params['id'];
        this.noticeId = id || '';
      }
    )
    this.noticeForm = new FormGroup({
      title: new FormControl('', [Validators.required]),       // 标题
      noticeType: new FormControl('', [Validators.required]),  // 类型
      content: new FormControl('', [Validators.required])      // 内容
    });
    this.editor = this.editor || '';  // 初始化编辑器
    this.typeList = this.typeList || []; // 类型
    if (this.noticeId) {
      this.seeNotice(this.noticeId);
    }
  }

  /**
   * 查询出要修改的数据
   */
  seeNotice(id) {
    this.appBackstageService.selectNotice(id).subscribe(
      res => {
        this.imgSrc = res['img'].split('.com')[1];
        this.noticeForm.patchValue(Object.assign({
          'title': res['title'],
          'noticeType': res['category_id'],
          'content': res['content']
        }, res));
      }
    )
  }

  /**
   * 上传图片
   */
  imgMethod(event) {
    this.imgSrc = event;
    this.error['img'] = !Boolean(this.imgSrc);
  }


  /**
   * 添加
   * @param params
   */
  create(params) {
    this.appBackstageService.addNotice(params).subscribe(
      res => {
        this.router.navigateByUrl('/appBackstage/noticeManage');
        this.flashMessages.wechatprompt('添加成功！');
      },
      error => {
        this.flashMessages.wechatprompt(error);
      }
    )
  }

  /**
   * 修改
   * @param params
   * @param id
   */
  update(params, id) {
    this.appBackstageService.updateNotice(params , id).subscribe(
      res => {
        this.router.navigateByUrl('/appBackstage/noticeManage');
        this.flashMessages.wechatprompt('修改成功！');
      },
      error => {
        this.flashMessages.wechatprompt(error);
      }
    )
  }

  /**
   * 添加和修改公告
   * @param form
   * @returns {boolean}
   */
  onSubmit(form) {
    if (!form.valid || this.imgSrc === '') {
      this.error['img'] = Boolean(this.imgSrc === '');
      return false;
    }
    const formValue = form.value;
    let filterTitle = formValue.title.trim();
    let filterContent = formValue.content.trim();
    if (filterTitle === '' || filterContent === '') {
      return false;
    }
    const params = {
      'title': formValue.title,
      'category_id': formValue.noticeType,
      'img': this.imgSrc,
      'content': formValue.content
    };
    if (!this.noticeId) {
      this.create(params);
    } else {
      this.update(params, this.noticeId);
    }
  }
}
