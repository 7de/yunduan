import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageService} from '#{service}/local-storage.service';
import {PictureService} from '#{service}/lives/picture.service';
import {Cookie} from 'ng2-cookies';
import {CompanyService} from '#{service}/company.service';
import {BusinessService} from '#{service}/business.service';

@Component({
  selector: 'app-lives-search-header',
  templateUrl: './lives-search-header.component.html',
  styleUrls: ['./lives-search-header.component.scss']
})
export class LivesSearchHeaderComponent implements OnInit {

  public searchKey;
  @Output() result = new EventEmitter();
  @Input() searchAll;
  public uploadBool: boolean;
  public companyType = this.localStorage.get('companyType');
  public livesData;
  public visible;
  public loginBool: boolean;

  public authorObj = {
    'natural': false, // 资质认证
    'wallet': false, // 钱包认证
    'lives': false // 课堂认证
  };
  public companyInfo;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private localStorage: LocalStorageService,
              private pictureService: PictureService,
              private companyService: CompanyService,
              private businessService: BusinessService) {

  }

  ngOnInit() {
    // this.companyType === '0' ? this.companyInfo = this.localStorage.getObject('currentCompany') : this.companyInfo = this.localStorage.getObject('serviceCompany');
    this.searchKey = this.route.snapshot.queryParams['keyword'];
    if (this.searchKey) {
      this.searchNow();
    }
    this.initLogin();
  }


  searchNow() {
    this.router.navigate(['/lives/lives-search'], {queryParams: {'keyword': this.searchKey}});
  }

  initLogin() {
    if (Cookie.get('currentCompanyAuthorization')) { // 登录了
      this.getCloudInfo();
    }
  }

  /**
   * 获取云课堂信息
   */
  getCloudInfo() {
    this.pictureService.getLivesInfo().subscribe(
      res => {
        // console.log(res);
        this.livesData = res;
      });
  }

  /**
   * 获取基金公司信息
   */
  getFundInfo(type) {
    this.companyService.getCompany().subscribe(
      res => {
        this.companyInfo = res;
        this.checkAll(type);
      });
  }

  /**
   * 获取服务商信息
   */
  getServiceInfo(type) {
    this.businessService.getBusiness({'expand': 'shop,profile,demands,wallet'}).subscribe(
      res => {
        this.companyInfo = res;
        this.checkAll(type);
      });
  }

  /**
   * 点击上传视频/图文
   */
  checkUpload(type) {
    this.companyType === '0' ? this.getFundInfo(type) : this.getServiceInfo(type);
    this.uploadBool = !this.uploadBool;

  }

  checkAll(type) {
    if (Cookie.get('currentCompanyAuthorization')) {
      if (this.companyType === '0') { // 基金公司
        if (this.companyInfo.flag === 1) { // 基金公司资质审核通过
          this.checkFundWallet(type);
        } else { // 资质审核不通过
          this.authorObj['natural'] = true;
          this.visible = true;
          // this.againCheckFund(type);
        }
      } else { // 服务商
        if (this.companyInfo.info_verify_type === 1) { // 服务商资质审核通过
          this.checkServiceWallet(type);
        } else { // 服务商资质审核不通过
          this.authorObj['natural'] = true;
          this.visible = true;
          // this.againCheck(type);
        }
      }
    } else {
      this.loginBool = true;
    }
  }

  /**
   *  基金公司验证钱包
   */
  checkFundWallet(type) {
    // this.companyService.getCompany().subscribe(
    //   res => {
    //     if (res['wallet'] && res['-000']['user_verify_type'] === 1) {
    //       this.livesAuthor(type);
    //     } else { // 钱包开通不成功
    //       this.authorObj['wallet'] = true;
    //       this.visible = true;
    //     }
    //   });

    if (this.companyInfo['wallet'] && this.companyInfo['-000']['user_verify_type'] === 1) {
      this.livesAuthor(type);
    } else { // 钱包开通不成功
      this.authorObj['wallet'] = true;
      this.visible = true;
    }
  }


  /**
   * 服务商验证钱包
   */
  checkServiceWallet(type) {
    if (this.companyInfo.wallet && this.companyInfo.wallet.user_verify_type === 1) { // 钱包开通成功
      this.livesAuthor(type);
    } else { // 钱包开通不成功
      this.authorObj['wallet'] = true;
    }
  }

  /**
   * 课堂认证判断
   */
  livesAuthor(type) {
    if (this.livesData['created']) { // 课堂开通成功
      if (this.companyType === '0') { // 基金公司
        if (type === 'pictures') { // 图文上传页面
          this.router.navigate(['/buyer/personal/index/upload-pictures']);
        } else { // 视频上传页面
          this.router.navigate(['/buyer/personal/index/upload-video']);
        }
      } else { // 第三方服务公司
        if (type === 'pictures') { // 视频上传页面
          this.router.navigate(['/seller/personal/index/upload-pictures']);
        } else { // 视频上传页面
          this.router.navigate(['/seller/personal/index/upload-video']);
        }
      }
    } else {
      this.authorObj['lives'] = true;
      this.visible = true;
    }
  }

  /**
   * 点击上传图文
   */
  // uploadPicture() {
  //   this.uploadBool = !this.uploadBool;
  //   if (Cookie.get('currentCompanyAuthorization')) {
  //     if (this.companyType === '0') { // 基金公司
  //       if (this.companyInfo.flag === 1) { // 资质审核通过
  //         this.companyService.getCompany().subscribe(
  //           res => {
  //             if (res['wallet']['user_verify_type'] === 1) {
  //               this.livesAuthor();
  //             }else { // 钱包开通不成功
  //               this.authorObj['wallet'] = true;
  //               this.visible = true;
  //             }
  //           });
  //       }else { // 资质审核不通过
  //         this.authorObj['natural'] = true;
  //         this.visible = true;
  //       }
  //     }else { // 服务商
  //       if (this.companyInfo.info_verify_type === 1){ // 服务商资质审核通过
  //         if(this.companyInfo.walle.user_verify_type === 1) { // 钱包开通成功
  //           this.livesAuthor();
  //         }else { // 钱包开通不成功
  //           this.authorObj['wallet'] = true;
  //           this.visible = true;
  //         }
  //       }else { //服务商资质审核不通过
  //         this.authorObj['natural'] = true;
  //         this.visible = true;
  //       }
  //     }
  //   }else {
  //     this.loginBool = true;
  //   }
  // }


  linkToHome() {
    this.router.navigate(['/lives/lives-index']);
  }

  linkToAuthen() {
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

  getDialog(e) {
    this.loginBool = e;
  }
}
