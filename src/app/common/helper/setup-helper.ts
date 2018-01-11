export class SetupHelper {

  /**
   * 根据文件名验证是否是图片
   * @param fileName
   * @returns bool 是图片返回 true
   */
  static validateImage(fileName) {
    let suffixIndex = fileName.lastIndexOf('.');
    let suffix = fileName.substring(suffixIndex + 1).toUpperCase();
    return ['BMP', 'JPG', 'JPEG', 'PNG', 'GIF'].includes(suffix);
  }

  /**
   * 根据文件名验证是否是视频
   * @param fileName
   * @returns bool 是视频返回 true
   */
  static validateVideo(fileName) {
    let suffixIndex = fileName.lastIndexOf('.');
    let suffix = fileName.substring(suffixIndex + 1).toUpperCase();
    return ['MP4'].includes(suffix); // 目前只支持MP4格式
  }

  /**
   * 导出文件
   * @param data
   * @param fileName string 文件名 'fileName.xls'
   */
  static exportData(data, fileName) {
    let blob = data;
    let a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
  }
}
