import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Config} from '../../../../../../config/config';
import {FundCompanyService} from '../../../../../../service/fund-company.service';
import {HttpClientService} from '../../../../../../service/http-client.service';
import {FlashMessagesService} from '../../../../../../service/flash-messages.service';

@Component({
  selector: 'app-personal-setphoto',
  templateUrl: './personal-setphoto.component.html',
  styleUrls: ['./personal-setphoto.component.scss']
})
export class PersonalSetphotoComponent implements OnInit {

  public imgSrc;
  public data;
  public form;
  public params;
  public baseInfo;
  public img;
  imageDomain: string = Config.imageDomain;
  constructor(public route: ActivatedRoute,
              public company: FundCompanyService,
              public http: HttpClientService,
              public flashMessages: FlashMessagesService) { }

  ngOnInit() {
    this.form = new FormGroup({
      msg_content: new FormControl('')
    });
    this.load();
  }


  load() {
    this.route.queryParams.subscribe(params => {
      this.params = Object.assign(
        {
          page: params['page'],
          pageSize: Config.pageSize
        }
      );
      this.info();
    })
  };

  info() {
    this.company.getuserinfofn({}).subscribe(
      res => {
        this.baseInfo = res;
        this.imgSrc = this.baseInfo['avatar'];
      }
    )
  }

  imgMethod(event) {
    this.imgSrc = event;
    if (this.baseInfo) {
      this.baseInfo.avatar = event;
    }
  }

  onSubmit(form, params) {
    Object.assign(params, {'logo_url': form.msg_content});
    this.company.updateFundCompanyInfo(params).subscribe(
      res => {
        this.flashMessages.wechatprompt('保存成功！');
        setTimeout(function() {
          window.location.reload();
        }, 500);
        // this.load();
      }
    )
  }

}
