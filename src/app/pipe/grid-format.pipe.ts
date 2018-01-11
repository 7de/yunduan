import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'gridFormat'
})
export class GridFormatPipe implements PipeTransform {

  transform(column, type, data): any {
    switch (type) {
      case 'formatAttribute':
        return this.formatAttribute(data, column);
      case 'configAttr':
        return this.configAttr(data, column);
      default:
        return '';
    }
  }


  formatAttribute(data, column) {
    if (column.value) {
      return column.value;
    }
    const ps = column.attribute.split(/\./); // 拆分属性
    if (ps.length) {
      let val = null;
      for (let i = 0, len = ps.length; i < len; i++) {
        if (data[ps[i]] && typeof data[ps[i]] !== 'undefined') {
          val = data[ps[i]]; // 深度访问取值
          data = val;
        } else {
          break;
        }
      }
      return val;
    }
  }


  configAttr(data, column) {
    if (column.url) {
      const params = column.url.split(':');
      const attribute = params[1];
      if (attribute) {
        return params[0] + data[attribute]
      }
      return column.url;
    }
  }

}
