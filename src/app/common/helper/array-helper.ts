export class ArrayHelper {

  /**
   * 删除数组空元素
   * @param arr
   */
  public static deleteEmpty(arr) {
    return arr.filter(function (item) {
      return item ? item : false;
    });
  }
}
