import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FundCompanyService} from '../../../../../../service/fund-company.service';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClientService} from '../../../../../../service/http-client.service';
import {LocalStorageService} from '../../../../../../service/local-storage.service';
import {FlashMessagesService} from '../../../../../../service/flash-messages.service';
import {ValidDetails, ValidIsEmpty} from '../../../../../../common/shared/validator';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit {
  public form;
  public baseInfo;
  public phone = this.localstorage.get('phone');
  constructor(
    public route: ActivatedRoute,
    private company: FundCompanyService,
    public http: HttpClientService,
    public localstorage: LocalStorageService,
    public flashMessages: FlashMessagesService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      nickname: new FormControl('', [ValidIsEmpty])
    });
    this.info(); // 基金公司的用户信息
  };

  public info() {
    this.company.getuserinfofn({}).subscribe(
      res => {
        this.baseInfo = res;
        this.form.patchValue({
          nickname: this.baseInfo.username
        });
      }
    )
  }

  onSubmit(form, params) {
    if (!form.valid) {
      return false;
    }
    Object.assign(params, {
      'nickname': form.value.nickname
    });
    this.company.updateFundCompanyInfo(params).subscribe(
      res => {
        this.flashMessages.wechatprompt('保存成功！');
        setTimeout(function() {
          window.location.reload();
        }, 500);
      }, err => {
        this.flashMessages.wechatprompt(err);
      }
    )
  }
}
