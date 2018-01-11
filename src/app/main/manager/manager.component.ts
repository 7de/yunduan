import {Component, OnInit} from '@angular/core';
import {HttpClientService} from '../../service/http-client.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FlashMessagesService} from '../../service/flash-messages.service';
import {MainComponent} from '../../common/base/main-component';
import {Config} from '../../config/config';
import {ManagerService} from '../../service/manager.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidateNum, ValidDetails} from '../../common/shared/validator';
import {ConfirmationService} from 'primeng/components/common/confirmationservice'
import {ObjectHelper} from '../../common/helper/object-helper';
import {LocalStorageService} from '../../service/local-storage.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent extends MainComponent implements OnInit {
  manager: any;
  imgSrc: any;
  managerForm: FormGroup;
  file: any[];
  private params;
  public managers: Array<any> = [];
  public pagination;
  public show = false;
  public errors = {};
  public descriptionLength = 150;
  public form;
  constructor(protected http: HttpClientService,
              public router: Router,
              private route: ActivatedRoute,
              private flashMessages: FlashMessagesService,
              private managerService: ManagerService,
              private localStorage: LocalStorageService,
              private confirmationService: ConfirmationService) {

    super(http);
    this.pagination = this.pagination || {};
    this.file = [];
  }

  ngOnInit() {
    this.form = new FormGroup({
      search: new FormControl('', [ValidDetails]), // 表单初始值
    });
    this.init();
    this.saveValue();
  }

  init() {
    this.route
      .queryParams
      .subscribe(params => {
        this.form.setValue({
          search: params['search'] || '',
        });
        this.params = Object.assign(
          {
            page: params['page'],
            pageSize: Config.pageSize,
          }, this.form.value);
        this.index();
      });
  }

  index() {
    this.managerService.getManagers(this.params).subscribe(
      res => {
        this.managers = res['items'];
        this.pagination = res['_meta'];
      });
  }

  /**
   * 分页操作数据
   * @param e
   */
  paginate(e) {
    this.router.navigate([this.router.url.split('?')[0]], {
      queryParams: {page: e.page + 1},
      queryParamsHandling: 'merge'
    });
  }

  saveValue() {
    this.localStorage.setObject('capacity', {'submitteds': true});
  }


  updateManager(manager) {
    this.show = true;
    this.imgSrc = manager.img;
    this.manager = manager;
    this.managerForm = new FormGroup({
      name: new FormControl(manager.name, [ValidDetails]), // 表单初始值
      work_year: new FormControl(manager.work_year, [ValidateNum, Validators.min(1), Validators.max(99)]), // 表单初始值
      description: new FormControl(manager.description, [Validators.maxLength(150)]) // 表单初始值
    });
  }


  onSubmit(form) {
    if (!form.valid || !this.imgSrc) {
      this.errors['img'] = !Boolean(this.imgSrc);
      return false;
    }
    const formValue = form.value;

    const params = {
      'name': formValue.name,
      'work_year': formValue.work_year,
      'img': this.imgSrc,
      'description': formValue.description || ''
    };
    if (this.manager.id) {
      this.update(this.manager.id, params);
    } else {
      this.create(params);
    }
  }

  create(params) {
    this.managerService.createManager(params).subscribe(
      result => {
        this.flashMessages.wechatprompt('新增成功！');
        this.show = false;
        this.init();
      });
  }


  update(id, params) {
    this.managerService.updateManager(this.manager.id, params).subscribe(
      result => {
        this.flashMessages.wechatprompt('修改成功！');
        this.show = false;
        this.init();
      });
  }

  /**
   * 上传图片
   */
  imgMethod(event) {
    this.imgSrc = event;
    this.errors['img'] = !Boolean(this.imgSrc);
  }

  onKeyup(event) {
    this.descriptionLength = 150 - (event.target.value.length);
  }

  delete(manager) {
    this.confirmationService.confirm({
      key: 'managerDel',
      icon: 'fa',
      // header: '温馨提示',
      message: '是否确定删除基金经理-' + manager.name + '?',
      accept: () => {
        this.managerService.deleteManager(manager.id).subscribe(
          () => {
            this.init();
            this.flashMessages.wechatprompt('删除成功！');
          },
          err => this.flashMessages.wechatprompt(err)
        )
      }
    });
  }

  // 搜索按钮确定搜索加载页面===get请求
  public submit(form) {
    let search = form.search;
    this.router.navigate(['/main/manager/index'], {
      queryParams: {
        search: search ? search.replace(/\s+/g, '') : null,
      }
    });
  }

}
