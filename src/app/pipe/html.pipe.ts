import {Pipe, PipeTransform} from '@angular/core';
import * as emotionParser from 'qq-wechat-emotion-parser'

@Pipe({
  name: 'html'
})
export class HtmlPipe implements PipeTransform {

  transform(value: string, type?: string): string {
    if (type === 'emoji') {
      return emotionParser(value);
    }
    return value;
  }

}
