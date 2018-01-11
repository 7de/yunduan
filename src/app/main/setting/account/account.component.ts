import {Component, OnInit} from '@angular/core';
import {HttpClientService} from '../../../service/http-client.service';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../../service/local-storage.service';

const COMPANY_URL = '/company';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  canInsert = false;
  company;
  extInfo;
  public errors = {};
  public scaled; // 返回管理规模人数
  public scaledsed; // 返回总管理规模
  public categorys; // 返回管理类别
  public showed = false;
  public scale = ['10人以下', '10-50人', '50人以上']; // 员工规模
  public scaleds = ['100万以下', '100万-500万', '500万-1000万', '1000万-5000万', '5000万以上'] // 总管理规模
  public category = ['私募证券投资基金', '私募股权、创业投资基金', '其它私募投资基金'] // 管理类别
  public buttons = ['提交审核', '审核通过', '审核中', '重新提交审核']; // 按钮文字
  public buttonValue; // 审核状态

  constructor(private http: HttpClientService, public router: Router, private localStorage: LocalStorageService) {
    this.company = this.company || Object;
    this.extInfo = this.extInfo || Object;
  }

  ngOnInit() {
    this.http.get(COMPANY_URL, {'expand': 'extinfo'}).subscribe(
      result => {
        this.company = result;
        if ([0, 3].includes(this.company.flag)) {
          this.router.navigateByUrl('/main/setting/information', { skipLocationChange: true });
        } else {
          this.view();
        }
      });
    this.saveValue();
  }

  /*
  * 获得账号的基本信息
  */
  view() {
    this.http.get(COMPANY_URL, {'expand': 'extinfo'}).subscribe(
      result => {
        this.company = result;
        // console.log(result);
        this.extInfo = result['extinfo'];
         if ([0, 3].includes(result['flag'])) {
          this.canInsert = true;
        }
        this.scaled = this.scale[result['extinfo'].company_scale];
        this.scaledsed = this.scaleds[result['extinfo'].manage_scale];
        this.categorys = this.category[result['extinfo'].manage_type];
        this.buttonValue = this.buttons[result['flag']];
      });

  }

  saveValue() {
    this.localStorage.setObject('capacity', {'submitteds': true});
  }

}
