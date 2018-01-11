import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClientService} from '../../../service/http-client.service';
import {FormControl, FormGroup} from '@angular/forms';
import {FlashMessagesService} from '../../../service/flash-messages.service';
import {ValidatePassword, ValidOldPassword} from '../../../common/shared/validator';
import {LocalStorageService} from '../../../service/local-storage.service';
import {FacilitatorService} from '../../../service/facilitator.service';


const PASSWORD_URL = '/company/pass';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  reviewForm: FormGroup;
  result;
  public action = false; // 原始密码错误
  public wrong = false; // 两次密码错误
  public step = false; // 密码和文本类型切换
  public new = false; // 密码和文本类型切换
  public flags = false; // 密码和文本类型切换
  public hint;    // 红色下划线
  public hints;  // 红色下划线
  public timer; // 定时器
  public params; // 传参对象
  constructor(private http: HttpClientService,
              private flashMessages: FlashMessagesService,
              private router: Router,
              private localStorage: LocalStorageService,
              private facilitatorService: FacilitatorService) {
  }

  ngOnInit() {
    this.reviewForm = new FormGroup({
      old_pass: new FormControl('', [ValidOldPassword]),    // 用户旧密码
      agin_pass: new FormControl('', [ValidatePassword]),     // 用户新密码
      new_pass: new FormControl('', [ValidOldPassword])      // 用户确认密码
    });
    this.saveValue();
  }

  saveValue() {
    this.localStorage.setObject('capacity', {'submitteds': true});
  }

  /*
   * 修改密码函数
   */
  modify(form) {
    if (!form.valid) {
      return false;
    }
    const formValue = form.value;
    const params = {
      'old_pass': formValue.old_pass,
      'new_pass': formValue.new_pass
    }
    let aginpass = formValue.agin_pass;
    let newpass = formValue.new_pass;
    if (newpass === aginpass) {
      this.http.put(PASSWORD_URL, params).subscribe(
        result => {
          this.result = result
          this.wrong = false;
          this.flashMessages.wechatprompt('修改成功！');
          // 重新登录
          this.timer = setTimeout(() => {
            this.facilitatorService.logout();
            this.router.navigateByUrl('site/home');
          }, 3000);
        },
        err => {
          this.wrong = true;
          this.hint = true;
          this.flashMessages.wechatprompt(err);
        });
      return this.action = false;
    } else {
      this.action = true;
      this.hints = true;
    }
  }
}
