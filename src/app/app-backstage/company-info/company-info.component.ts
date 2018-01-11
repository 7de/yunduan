import {Component, OnInit} from '@angular/core';
import {HttpClientService} from '../../service/http-client.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FlashMessagesService} from '../../service/flash-messages.service';
import {MainComponent} from '../../common/base/main-component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfirmationService} from 'primeng/components/common/confirmationservice'
import {AppBackstageService} from '../../service/app-backstage.service';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss']
})

export class CompanyInfoComponent extends MainComponent implements OnInit {
  private params;  // 参数
  companyData; // 公司信息
  public imgSrc;   // Banner图片地址
  public bannerForm: FormGroup;  // 表单数据
  public Banner;   // Banner图数据
  public show = false; // 控制添加和编辑的相互切换
  public error = {};   // 未上传图片的错误信息
  public descriptionLength = 0;  // 字数限制
  public errorText = false;  // 错误信息提示的文本
  public introduce = false;  // 公司介绍编辑
  editeIntroduceInfo;
  public business = false;   // 公司业务范围
  editeBusinessInfo;
  public consult = false;    // 咨询电话
  editeConsultInfo;
  public introduceText = ''; // 介绍内容
  public businessText = '';  // 业务内容
  public consultTel = '';    // 咨询电话
  public BannerId;   // 修改的Banner图id
  public BannerNum;  // Banner图的张数
  public tmpVar = false;

  constructor(
    protected http: HttpClientService,
    public router: Router,
    private route: ActivatedRoute,
    private flashMessages: FlashMessagesService,
    private confirmationService: ConfirmationService,
    private appBackstageService: AppBackstageService
  ) {super(http); }

  ngOnInit() {
    this.init();
  }

  init() {
    this.getCompanyInfo();  // 获取公司介绍、业务范围、App咨询电话
    this.bannerList();      // 获取Banner图列表
  }

  /**
   * 限制输入的字数
   */
  onKeyup(event , len = 150) {
    this.errorText = event.target.value.length <= 0 ? true : false;
    let character = len - (event.target.value.length);
    this.descriptionLength = character <= 0 ? 0 : character;
  }

  /**
   * 电话输入限制
   */
  TelonKeyup(event) {
    this.errorText = event.target.value.length < 7 || event.target.value.length > 13 ? true : false;
  }

  /**
   * 上传图片
   */
  imgMethod(event) {
    this.tmpVar = true;
    this.imgSrc = event;
    this.error['img'] = !Boolean(this.imgSrc);
  }

  /**
   * 获取公司介绍和业务范围
   */
  getCompanyInfo() {
    this.appBackstageService.getCompanyInfo().subscribe(
      res => {
        this.companyData = res['extinfo'];
        this.editeIntroduceInfo = this.companyData['description'];
        this.editeBusinessInfo = this.companyData['business_scope'];
        this.editeConsultInfo = this.companyData['app_tel'];
      },
      error => {
        this.flashMessages.wechatprompt(error);
      }
    );
  }

  /**
   * 填写的状态 (公司介绍和业务范围)
   */
  changeValue(event) {
    if (event === 'introduce') {
      this.introduce = !this.introduce;
    } else if (event === 'business') {
      this.business = !this.business;
    } else if (event === 'consult') {
      this.consult = !this.consult;
    }
    this.errorText = false;
  }

  /**
   * 编辑公司公告
   */
  editIntroduce(event) {
    let ContentText = event.trim();
    this.errorText = ContentText === '' ? true : false;
    if (ContentText) {
      let params = {'description': ContentText};
      this.appBackstageService.editCompanyInfo(params).subscribe(
        res => {
          this.getCompanyInfo();
          this.introduce = false;
          this.flashMessages.wechatprompt('编辑成功！');
        },
        error => {
          this.flashMessages.wechatprompt(error);
        }
      );
    }
  }

  /**
   * 编辑业务范围
   */
  editBusiness(event) {
    let ContentText = event.trim();
    this.errorText = (ContentText === '' ? true : false);
    console.log(ContentText);
    if (ContentText) {
      this.appBackstageService.editCompanyInfo({business_scope: ContentText}).subscribe(
        res => {
          console.log(res);
          this.getCompanyInfo();
          this.businessText = ContentText;
          this.business = false;
          this.flashMessages.wechatprompt('编辑成功！');
        },
        error => {
          this.flashMessages.wechatprompt(error);
        }
      );
    }
  }

  /**
   * 编辑App咨询电话
   */
  editConsult(event) {
    let ContentText = event.trim();
    this.errorText = ContentText === '' ? true : false;
    if (ContentText.length < 7 || ContentText.length > 13) {
      this.errorText = true;
      return false;
    }
    if (ContentText) {
      this.appBackstageService.editCompanyInfo({'app_tel': ContentText}).subscribe(
        res => {
          this.getCompanyInfo();
          this.consult = false;
          this.flashMessages.wechatprompt('编辑成功！');
        },
        error => {
          this.flashMessages.wechatprompt(error);
        }
      );
    }
  }

  /**
   * 获取Banner图列表
   */
  bannerList() {
    this.appBackstageService.getCarouselInfo().subscribe(
      res => {
        this.Banner = res;
        this.BannerNum = this.Banner.length
      },
      error => {
        this.flashMessages.wechatprompt(error);
      }
    );
  }

  /**
   * 删除Banner图
   */
  delete(id , title) {
    this.confirmationService.confirm({
      key: 'managerDel',
      icon: 'fa',
      // header: '温馨提示',
      message: '是否确定删除这张Banner图-' + title + '?',
      accept: () => {
        this.appBackstageService.deleteCarousel(id).subscribe(
          res => {
            this.init();
            this.flashMessages.wechatprompt('删除成功！');
          },
          error => {
            this.flashMessages.wechatprompt(error);
          }
        )
      }
    });
  }

  /**
   * 查询原有Banner图信息
   */
  seeBanner(params , id) {
    this.BannerId = id;
    this.tmpVar = this.show;
    this.imgSrc = Object.keys(params).length === 0 ? '' : params['img_path'];
    let titlVal =  Object.keys(params).length === 0 ? '' : params['img_title'];
    this.bannerForm = new FormGroup({
      title: new FormControl(titlVal, [Validators.required])
    });
    this.show = true;
  }

  /**
   *  添加Banner图列表
   */
  addBanner(params) {
    this.appBackstageService.addCarousel(params).subscribe(
      res => {
        this.init();
        this.show = false;
        this.flashMessages.wechatprompt('添加成功！');
      },
      error => {
        this.flashMessages.wechatprompt(error);
      }
    )
  }

  /**
   * 编辑Banner图
   */
  editBanner(id, params) {
    this.appBackstageService.changeCarousel(id , params).subscribe(
      result => {
        this.flashMessages.wechatprompt('修改成功！');
        this.show = false;
        this.init();
      },
      error => {
        this.flashMessages.wechatprompt(error);
        this.show = false;
      }
    );
  }

  // 添加或编辑Banner图
  onSubmit(form) {
    this.tmpVar = true;
    if (!form.valid || this.imgSrc === '') {
      this.error['img'] = Boolean(this.imgSrc === '');
      return false;
    }
    const formValue = form.value;
    let title = formValue.title.trim();
    if (!title) {
      return false;
    }
    const params = {
      'title': formValue.title,
      'img': this.imgSrc
    };
    if (this.BannerId) {
      this.editBanner(this.BannerId, params);
    } else {
      this.addBanner(params);
    }
  }
}
