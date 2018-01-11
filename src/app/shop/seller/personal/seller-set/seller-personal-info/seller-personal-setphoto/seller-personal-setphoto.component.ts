import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Config} from '../../../../../../config/config';
import {HttpClientService} from '../../../../../../service/http-client.service';
import {FlashMessagesService} from '../../../../../../service/flash-messages.service';
import {BusinessService} from '../../../../../../service/business.service';

@Component({
  selector: 'app-seller-personal-setphoto',
  templateUrl: './seller-personal-setphoto.component.html',
  styleUrls: ['./seller-personal-setphoto.component.scss']
})
export class SellerPersonalSetphotoComponent implements OnInit {

  public imgSrc;
  public data;
  public form;
  public params;
  public baseInfo;
  public img;
  imageDomain: string = Config.imageDomain;
  constructor(
    public route: ActivatedRoute,
    private business: BusinessService,
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
    this.http.version = Config.mainApiBusiness;
    this.business.getuserinfofn({}).subscribe(
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
    this.business.updateSingleInfo(params).subscribe(
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
