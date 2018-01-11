import {Component, OnInit} from '@angular/core';
import {Config} from '../../../../config/config';
import {ActivatedRoute, Router} from '@angular/router';
import {MailService} from '../../../../service/mail.service';

@Component({
  selector: 'app-seller-personal-message',
  templateUrl: './seller-personal-message.component.html',
  styleUrls: ['./seller-personal-message.component.scss']
})
export class SellerPersonalMessageComponent implements OnInit {
  mailData; // 获取站内信
  mailDataCount; //获取站内信未读信息
  pagination; // 分页
  mailType;  // 区分系统消息--0 和交易信息--1
  items = [
    {title: '系统信息', url: '/seller/personal/message', queryParams: {'notice_type': 0}},
    {title: '交易提醒', url: '/seller/personal/message', queryParams: {'notice_type': 1}},
  ];

  constructor(private mail: MailService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.load();
  }
  /**
   * 初始化
   */
  load() {
    this.route.queryParams.subscribe(params => {
      this.mail.getSellerMail({
        notice_type: params['notice_type'],
        page: params['page'],
        pageSize: 5,
      }).subscribe(res => {
        this.mailData = res['items'];
        this.pagination = res['_meta'];
        // console.log(this.mailData.length)
      });
      this.mailType = this.route.snapshot.queryParams['notice_type'];
    });
    window.scrollTo(0, 0);
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
    window.scrollTo(0, 0);
  }

}
