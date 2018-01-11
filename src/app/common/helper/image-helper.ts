import {Config} from '../../config/config';
import {SetupHelper} from './setup-helper';

export class ImageHelper {

  /**
   * 根据图片/文件路径获取获取 URL
   * @param {string} fileName
   * @param {number} width
   * @param {number} height
   * @returns {string}
   */
  static transform(fileName: string, width?: number, height?: number): string {
    if (fileName) {
      const andWidth = width ? `,w_${width}` : '';
      const andHeight = height ? `,h_${height}` : '';
      if (andHeight || andWidth) {
        return Config.imageDomain + fileName + `?x-oss-process=image/resize${andWidth}${andHeight}`;
      }
      return Config.imageDomain + fileName;

    }
  }
}
