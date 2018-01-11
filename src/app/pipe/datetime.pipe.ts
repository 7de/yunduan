import {Pipe, PipeTransform} from '@angular/core';
import {DatetimeHelper} from '../common/helper/datetime-helper';

@Pipe({
  name: 'datetime'
})
export class DatetimePipe implements PipeTransform {
  transform(dataStr, type = 'time-ago', format = null) {
    if (type === 'diffTime') {
      return DatetimeHelper.diffTime(dataStr)
    }
    return DatetimeHelper.format(dataStr, type, format);
  }
}
