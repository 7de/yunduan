import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FlashMessagesService} from '#{service}/flash-messages.service';
import {VideoService} from '#{service}/lives/video.service';
import {LocalStorageService} from '#{service}/local-storage.service';
import {PictureService} from '#{service}/lives/picture.service';
import {CompanyService} from '#{service}/company.service';
import {BusinessService} from "#{service}/business.service";

@Component({
  selector: 'app-my-serial',
  templateUrl: './my-serial.component.html',
  styleUrls: ['./my-serial.component.scss']
})
export class MySerialComponent implements OnInit {

  public deleteBool: boolean;
  public deleteId;
  public uploadBool: boolean;
  public serialData;
  public livesData;
  public params = {
    media_type: 0,
    title: '',
    page: 1,
    pageSize: 10
  };
  public status;
  public pagination: any;
  public media_type = 0;
  public serialCount;
  public hoverBool;
  public createBool;
  public editId;
  public livesBool;

  public authorObj = {
    'natural': false, // 资质认证
    'wallet': false, // 钱包认证
    'lives': false // 课堂认证
  };
  public companyType = this.localStorage.get('companyType');
  public companyInfo;

  constructor(private videoService: VideoService,
              private route: ActivatedRoute,
              private router: Router,
              private flashMessages: FlashMessagesService,
              private localStorage: LocalStorageService,
              private pictureService: PictureService,
              private companyService: CompanyService,
              private businessService: BusinessService) {
    this.getCloudInfo();
  }

  ngOnInit() {
    // this.companyType === '0' ? this.companyInfo = this.localStorage.getObject('currentCompany') : this.companyInfo = this.localStorage.getObject('serviceCompany');
    this.route.queryParams.subscribe(params => {
      const {status, page} = params;
      status ? this.status = status : this.status = 'videos';
      let _params = {page};
      switch (status) {
        case 'videos':
          Object.assign(_params, {media_type: 0});
          break;
        case 'pictures':
          Object.assign(_params, {media_type: 1});
          break;
        default:
          break
      }
      this.getMySerial(_params);
    });
  }

  /**
   * 获取连载数量
   */
  getSerialCount() {
    this.videoService.getSerialNum().subscribe(
      res => {
        this.serialCount = res;
      });
  }

  /**
   * 获取我的连载列表 - 搜索
   */
  getMySerial(params = {}) {
    Object.assign(this.params, params);
    this.videoService.getMySerial(this.params).subscribe(
      res => {
        this.serialData = res['items'];
        this.pagination = res['_meta'];
        this.getSerialCount()
      });
  }

  /**
   * 改变状态
   * @param status
   */
  changeStatus(status) {
    this.params['title'] = '';
    if (status === 'videos') {
      this.media_type = 0;
    } else {
      this.media_type = 1;
    }
    this.router.navigate([], {
      queryParams: {
        status: status,
        page: 1
      },
      relativeTo: this.route
    })
  }

  /**
   * 删除我的连载
   */
  deleteSerial() {
    this.videoService.deleteMySerial(this.deleteId).subscribe(
      res => {
        this.deleteBool = !this.deleteBool;
        this.getMySerial();
        this.flashMessages.wechatprompt('删除成功');
      },
      error => {
        this.deleteBool = !this.deleteBool;
        this.flashMessages.wechatprompt(error);
        this.getMySerial();
      });
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
   * 查看连载
   * @param data
   */
  checkSerial(data) {
    // console.log(typeof data['media_type'])
    if (data['media_type'] === 0) { // 视频
      this.router.navigate(['/lives/videos-index'], {queryParams: {id: data['id']}});
    } else { // 图文
      this.router.navigate(['/lives/pictures-index', data['id']]);
    }
  }

  /**
   * 获取云课堂信息
   */
  getCloudInfo() {
    this.editId = '';
    this.pictureService.getLivesInfo().subscribe(
      res => {
        this.livesData = res;
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
   * 创建连载
   */
  createMySerial() {
    this.companyType === '0' ? this.getFundInfo() : this.getServiceInfo();
    this.editId = '';
  }

  checkAll() {
    if (this.companyType === '0') { // 基金公司
      if (this.companyInfo.flag === 1) { // 资质审核通过
        this.checkFundWallet();
      } else { // 基金公司资质审核不通过
        this.authorObj['natural'] = true;
        this.livesBool = true;
        // this.againCheckFund(); // 基金公司再次确认审核判断
      }
    } else { // 服务商
      if (this.companyInfo.info_verify_type === 1) { // 服务商资质审核通过
        this.checkServiceWallet();
      } else { // 服务商资质审核不通过
        this.authorObj['natural'] = true;
        this.livesBool = true;
        // this.againCheckService(); // 再次判断有没有审核通过
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
   * 课堂认证判断
   */
  livesAuthor() {
    if (this.livesData['created']) { // 课堂开通成功
      this.createBool = true;
    } else {
      this.authorObj['lives'] = true;
      this.livesBool = true;
    }
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
      if (this.companyType === '0') {
        this.router.navigate(['/buyer/personal/set/course-materials']);
      } else {
        this.router.navigate(['/seller/personal/set/course-materials']);
      }
    }

  }

  editSerial(id) {
    if (id) {
      this.createBool = true;
      this.editId = id;
    }
  }

  hideDialog(e) {
    this.createBool = e;
    this.getMySerial();
  }

}
