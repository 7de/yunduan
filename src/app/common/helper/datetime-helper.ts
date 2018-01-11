import * as moment from 'moment';
// declare let moment: any;
moment.locale('zh-cn');
const DATE_FORMAT = 'YYYY-MM-DD';
const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export class DatetimeHelper {
  /**
   * 时间戳转换
   * @param dataStr
   * @param {string} type
   * @param {any} format
   * @returns {any}
   */
  static format(dataStr, type = 'time-ago', format = null) {
    const datetime = moment.unix(dataStr);
    if (type === 'datetime') {
      const fmt = (format == null) ? DATE_FORMAT : format;
      return datetime.format(fmt);
    } else if (type === 'time') {
      const fmt = (format == null) ? TIME_FORMAT : format;
      return datetime.format(fmt);
    }
    return moment.unix(dataStr).fromNow()
  }

  /**
   * 时间转时间戳
   * @param date
   * @returns {any}
   */
  static toTimestamp(date) {
    return Date.parse(date) / 1000;
  }

  /**
   * 时间戳返回时间格式
   * @param timestamp 时间戳
   * @returns {Date}
   */
  static toDate(timestamp) {
    return new Date(moment.unix(timestamp)['_d']);
  }

  /**
   * 时间差
   * @param startTime 时间戳
   * @param endTime 时间戳
   * @returns {any}
   */
  static diff(startTime, endTime) {
    const end = Date.parse(endTime) / 1000;
    const start = Date.parse(startTime) / 1000;
    let diffTime = Number(end) - Number(start);
    return this.diffTime(diffTime);
  }

  static diffTime(diffTime) {
    if (diffTime < 0) {
      return ' ';
    }
    let month = moment.duration(diffTime * 1000).months();
    let year = moment.duration(diffTime * 1000).years();
    let day = moment.duration(diffTime * 1000).days();
    let hours = moment.duration(diffTime * 1000).hours();
    let minutes;
    let mTime = moment.duration(diffTime * 1000).minutes();
    let seconds;
    let sTime = moment.duration(diffTime * 1000).seconds();
    if (mTime < 10) {
      minutes = '0' + mTime;
    } else {
      minutes = mTime;
    }
    if (sTime < 10) {
      seconds = '0' + sTime;
    } else {
      seconds = sTime;
    }
      return (year ? `${year}年` : '') + (month ? `${month}月` : '') + (day ? `${day}天` : '') + (hours ? `${hours}小时` : '') + (minutes ? `${minutes}分钟` : '0分钟') + (minutes ? `${seconds}秒`: '0秒');
  }

  /**
   * 时间期间
   * @param startTime
   * @param endTime
   */
  static duration(startTime, endTime) {
    const end = Date.parse(endTime) / 1000;
    const start = Date.parse(startTime) / 1000;
    let diffTime = Number(end) - Number(start);
    return moment.duration(diffTime * 1000);
  }
}
