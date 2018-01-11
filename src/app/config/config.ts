import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable()
export class Config {
  public static apiDomain: string = environment.apiDomain; // api 域名
  public static imageDomain: string = environment.imageDomain; // 图片域名
  public static wechatDomain: string = environment.wechatDomain; // 微信端网页域名
  public static homepageDomain: string = environment.homepageDomain; // 首页域名
  public static officialDomain: string = environment.officialDomain; // 正式域名

  public static pageSize = 10; // 每页显示个数
  public static mainApiVersion = 'v1';
  public static wechatApiVersion = 'wechat';
  public static mainApiBusiness = 'business';

  public static calendarLocaleCN: object = {
    firstDayOfWeek: 1,
    dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
    monthNames: ['一月份', '二月份', '三月份', '四月份', '五月份', '六月份', '七月份', '八月份', '九月份', '十月份', '十一月份', '十二月份'],
    monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    today: '今天',
    clear: '清空'
  };


  /**
   * 编辑器的配置文件
   * @type {{imageUrl: string; imageFieldName: string; imagePath: string; toolbar: [string , string , string , string , string , string]}}
   */
  public static umeditorConfig = {
    imageUrl: Config.apiDomain + Config.mainApiVersion + '/file/upload-img?fileType=image',
    imageFieldName: 'file',
    imagePath: Config.imageDomain,
    toolbar: [
      'undo redo | bold italic underline strikethrough | superscript subscript | forecolor backcolor | removeformat |',
      'insertorderedlist insertunorderedlist | selectall cleardoc paragraph | fontfamily fontsize',
      '| justifyleft justifycenter justifyright justifyjustify |',
      'link unlink | emotion image ',
      '| horizontal print preview fullscreen', 'drafts'
    ]
  }
}
