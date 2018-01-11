import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {HttpClientService} from '../../../service/http-client.service';
import {MainComponent} from '../../../common/base/main-component';
import {FlashMessagesService} from '../../../service/flash-messages.service';
import {ValidatePhone,ValidDetails} from '../../../common/shared/validator';


@Component({
  selector: 'app-index-bombbox',
  templateUrl: './index-bombbox.component.html',
  styleUrls: ['./index-bombbox.component.scss']
})
export class IndexBombboxComponent extends MainComponent implements OnInit {

  private Url = '/demands';
  public params;
  public data;
  public descriptionLength = 300;

  @Input() onOff = false;
  @Input() demandId: number; // 父级传需求ID
  @Input() demandTitle: string; // 父级传需求TITLE
  @Output() bombEvent = new EventEmitter();

  // 表单参数
  formModel: FormGroup;

  constructor(private flashMessages: FlashMessagesService, protected http: HttpClientService, private route: ActivatedRoute) {
    super(http);
  }

  ngOnInit() {
    this.formModel = new FormGroup({
      demand_category_id: new FormControl(this.demandId),
      username: new FormControl('', [ValidDetails]),
      tel: new FormControl('', [ValidatePhone]),
      demand: new FormControl('', [ValidDetails])
    });
  }

  onSubmit() {
    if (this.formModel.valid) {
      this.closeBomb(0);
      this.demandData();
    } else {
      return false
    }
  }

  closeBomb(bool) {
    // this.onOff = false;
    this.bombEvent.emit(bool);
  }

  // 发布需求数据
  demandData() {
    // const params = Object.assign(this.formModel.value, this.params);
    return this.http.post(this.Url, this.formModel.value).subscribe(
      result => {
        // //;(result);
        if (result) {
          this.flashMessages.wechatprompt('需求发布成功！');
        }
      },
      err => {
        this.flashMessages.wechatprompt('需求发布失败！' + err);
      })
  }

  onKeyup(event) {
    this.descriptionLength = 300 - (event.target.value.length);
  }

}
