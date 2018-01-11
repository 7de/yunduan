import {Pipe, PipeTransform} from '@angular/core';
import {ImageHelper} from '../common/helper/image-helper';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(fileName: string, width?: number, height?: number): string {
    return ImageHelper.transform(fileName, width, height);
  }

}
