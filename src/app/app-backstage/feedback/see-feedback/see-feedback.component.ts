import {Component, OnInit} from '@angular/core';
import {HttpClientService} from '../../../service/http-client.service';
import {ActivatedRoute , Router} from '@angular/router';
import {MainComponent} from '../../../common/base/main-component';
import {AppBackstageService} from '../../../service/app-backstage.service';
import {FlashMessagesService} from '../../../service/flash-messages.service';

@Component({
  selector: 'app-see-feedback',
  templateUrl: './see-feedback.component.html',
  styleUrls: ['./see-feedback.component.scss']
})

export class SeeFeedbackComponent extends MainComponent implements OnInit {
  public data; // 用户信息接收数据
  public prevImgArr;    // 预约图片的数据
  public prevIcon = false;   // 提醒可以预览的小图标
  public picPreview = false; // 图片预览
  public prevUrl = '';
  public tmpNums;       // 标示的数字

  constructor(
    protected http: HttpClientService,
    private route: ActivatedRoute,
    private router: Router,
    private flashMessages: FlashMessagesService,
    private appBackstageService: AppBackstageService
  ) {super(http)}

  ngOnInit() {
    // subscribe参数订阅(意见反馈详情id)
    this.route.params.subscribe((params) => {
      let feedbackId = params['id'];
      this.feedbackDetails(feedbackId);
    })
  }

  // 意见反馈详情
  feedbackDetails(id) {
    let obj = {'expand': 'userProfile,user'};
    this.appBackstageService.feedbackDetails(obj , id).subscribe(
      res => {
        this.data = res;
        this.prevImgArr = this.data.img_arr;
      },
      error => {
        this.flashMessages.wechatprompt(error);
      }
    )
  }

  // 提示的小图片显示
  public pictureReminder(event , eventType , tindex) {
    this.tmpNums = tindex;
    this.prevIcon = eventType === 'focus' ? true : false;
  }

  // 图片预览
  public picPrev(event , url , tindex) {
    this.tmpNums = tindex;
    this.picPreview = !this.picPreview;
    this.prevIcon = !this.prevIcon;
    this.prevUrl = url;
  }

  // 返回跳转
  public toInvestedUser() {
    this.router.navigate(['/appBackstage/feedback'])
  }
}
