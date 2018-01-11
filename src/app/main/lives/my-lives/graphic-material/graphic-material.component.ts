import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FlashMessagesService} from '#{service}/flash-messages.service';
import {LocalStorageService} from '#{service}/local-storage.service';
import {PictureService} from '#{service}/lives/picture.service';
import {CompanyService} from '#{service}/company.service';
import {BusinessService} from '#{service}/business.service';

@Component({
  selector: 'app-graphic-material',
  templateUrl: './graphic-material.component.html',
  styleUrls: ['./graphic-material.component.scss']
})
export class GraphicMaterialComponent implements OnInit {

  public serialItem;
  public params = {
    expand: 'media_info',
    status: 'all',
    title: '',
    page: 1,
    pageSize: 10
  };
  public pagination: any;
  public status;
  public deleteBool: boolean;
  public livesBool: boolean;
  public deleteId;
  public companyInfo;
  public livesData;
  public picturesCount;
  public companyType = this.localStorage.get('companyType');
  public hoverBool;
  public authorObj = {
    'natural': false, // 资质认证
    'wallet': false, // 钱包认证
    'lives': false // 课堂认证
  };

  constructor(private pictureService: PictureService,
              private route: ActivatedRoute,
              private router: Router,
              private flashMessages: FlashMessagesService,
              private localStorage: LocalStorageService,
              private companyService: CompanyService,
              private businessService: BusinessService) {
    this.getCloudInfo();
  }

  ngOnInit() {
    // this.companyType === '0' ? this.companyInfo = this.localStorage.getObject('currentCompany') : this.companyInfo = this.localStorage.getObject('serviceCompany');
    this.route.queryParams.subscribe(params => {
      const {status, page} = params;
      this.status = status;
      let _params = {page};
      switch (status) {
        case 'pass':
          Object.assign(_params, {status: 0});
          break;
        case 'pending':
          Object.assign(_params, {status: 1});
          break;
        case 'not_pass':
          Object.assign(_params, {status: 2});
          break;
        default:
          this.status = 'all';
          Object.assign(_params, {status: ''});
      }
      this.getPicturesList(_params);
    });
  }

  /**
   * 获取云课堂信息
   */
  getCloudInfo() {
    this.pictureService.getLivesInfo().subscribe(
      res => {
        this.livesData = res;
      });
  }

  /**
   * 获取图文列表/搜索
   */
  getPicturesList(params = {}) {
    Object.assign(this.params, params);
    this.pictureService.getGraphicList(this.params).subscribe(
      res => {
        this.serialItem = res['items'];
        this.pagination = res['_meta'];
        this.getPicturesNum();
      });
  }

  /**
   * 获取图文素材数量
   */
  getPicturesNum() {
    this.pictureService.getPicturesMaterialNum().subscribe(
      res => {
        this.picturesCount = res;
      });
  }

  /**
   * 改变状态
   * @param status
   */
  changeStatus(status) {
    this.params['title'] = '';
    this.router.navigate([], {
      queryParams: {
        status: status,
        page: 1
      },
      relativeTo: this.route
    });
  }

  /**
   * 删除图文
   */
  deletePic() {
    this.pictureService.deleteGraphic(this.deleteId).subscribe(
      res => {
        this.deleteBool = !this.deleteBool;
        this.getPicturesList();
        this.flashMessages.wechatprompt('删除成功');
      },
      error => {
        this.deleteBool = !this.deleteBool;
        this.getPicturesList();
        this.flashMessages.wechatprompt('删除失败');
      });
  }

  /**
   * 获取基金公司信息
   */
  getFundInfo() {
    this.companyService.getCompany().subscribe(
      res => {
        this.companyInfo = res;
        this.checkAll();
      });
  }

  /**
   * 获取服务商信息
   */
  getServiceInfo() {
    this.businessService.getBusiness({'expand': 'shop,profile,demands,wallet'}).subscribe(
      res => {
        this.companyInfo = res;
        this.checkAll();
      });
  }

  /**
   * 上传图文判断状态
   */
  uploadPicFiles() {
    this.companyType === '0' ? this.getFundInfo() : this.getServiceInfo();
  }

  checkAll() {
    if (this.companyType === '0') { // 基金公司
      if (this.companyInfo.flag === 1) { // 资质审核通过
        this.checkFundWallet();
      } else { // 基金公司资质审核不通过
        this.authorObj['natural'] = true;
        this.livesBool = true;
        // this.againCheckFund();
      }
    } else { // 服务商
      if (this.companyInfo.info_verify_type === 1) { // 服务商资质审核通过
        this.checkServiceWallet();
      } else { // 服务商资质审核不通过
        this.authorObj['natural'] = true;
        this.livesBool = true;
        // this.againCheckService();
      }
    }
  }

  /**
   *  基金公司验证钱包
   */
  checkFundWallet() {
    // this.companyService.getCompany().subscribe(
    //   res => {
    //     if (res['wallet'] && res['wallet']['user_verify_type'] === 1) {
    //       this.livesAuthor();
    //     } else { // 钱包开通不成功
    //       this.authorObj['wallet'] = true;
    //       this.livesBool = true;
    //     }
    //   });

    if (this.companyInfo['wallet'] && this.companyInfo['wallet']['user_verify_type'] === 1) {
      this.livesAuthor();
    } else { // 钱包开通不成功
      this.authorObj['wallet'] = true;
      this.livesBool = true;
    }
  }

  /**
   * 再次判断基金公司审核
   */
  againCheckFund() {
    this.companyService.getCompany().subscribe(
      res => {
        if (res['flag'] === 1) { // 基金公司资料审核通过
          this.checkFundWallet();
        } else { // 基金公司资料审核通过
          this.authorObj['natural'] = true;
          this.livesBool = true;
        }
      });
  }

  /**
   * 服务商验证钱包
   */
  checkServiceWallet() {
    if (this.companyInfo.wallet && this.companyInfo.wallet.user_verify_type === 1) { // 钱包开通成功
      this.livesAuthor();
    } else { // 钱包开通不成功
      this.authorObj['wallet'] = true;
    }
  }

  /**
   * 服务商资质审核再次判断
   */
  againCheckService() {
    this.businessService.getBusiness({'expand': 'shop,profile,demands,wallet'}).subscribe(
      res => {
        if (res['info_verify_type'] === 1) {
          this.checkServiceWallet();
        } else {
          this.authorObj['natural'] = true;
          this.livesBool = true;
        }
      });
  }

  /**
   * 课堂认证判断
   */
  livesAuthor() {
    if (this.livesData['created']) { // 课堂开通成功
      if (this.companyType === '0') {
        this.router.navigate(['/buyer/personal/index/upload-pictures']);
      } else {
        this.router.navigate(['/seller/personal/index/upload-pictures']);
      }
    } else {
      this.authorObj['lives'] = true;
      this.livesBool = true;
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

  finishLivesInfo() {
    if (this.authorObj['natural']) { // 资质审核不通过
      if (this.companyType === '0') { // 基金公司
        this.router.navigate(['/main/setting/account'])
      } else { // 服务商
        this.router.navigate(['/seller/personal/set/realnameauth']);
      }
    } else if (this.authorObj['wallet']) { // 钱包认证不通过
      this.router.navigate(['/shop/wallet']);
    } else if (this.authorObj['lives']) { // 课堂认证不通过
      let companyType = this.localStorage.get('companyType');
      if (companyType === '0') {
        this.router.navigate(['/buyer/personal/set/course-materials']);
      } else {
        this.router.navigate(['/seller/personal/set/course-materials']);
      }
    }
  }
}
