import {isUndefined} from 'util';

export class ObjectHelper {

  public static diffArray(arr1, arr2) {
    let myArr = arr1.concat(arr2);

    return myArr.filter(function (item) {
      return arr2.indexOf(item) < 0 || arr1.indexOf(item) < 0;
    });
  }

  /**
   * 删除数组中某一个键值的值
   * @param array
   * @param key
   * @param value
   */
  public static removeArray(array, key, value) {
    if (value === isUndefined) {
      return;
    }
    for (let i in array) {
      if (array[i][key] === value) {
        array.splice(i, 1);
      }
    }
  }

  /**
   * 获取对象某一个键值的值
   * @param array
   * @param key
   * @param value
   * @returns {string}
   */
  public static getArrayIdx(array, key, value) {
    if (value === isUndefined) {
      return;
    }
    for (let i in array) {
      if (array[i][key] === value) {
        return i;
      }
    }
  }

  /**
   * 判断对象是否为空
   * @param obj
   * @returns {any | boolean}
   */
  public static isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length === 0));
  }


  /**
   * 从一组对象中提取属性作为数组的值
   * var myArray = [{foo: 1, bar: 2}, {bar: 3, baz: 4}, {foo: 5, baz: 6}];
   * //;(getFields(myArray, 'foo')); // [1, 5]
   * @param list array
   * @param field
   */
  getFields(list, field) {
    //  reduce the provided list to an array only containing the requested field
    return list.reduce(function (carry, item) {
      //  check if the item is actually an object and does contain the field
      if (typeof item === 'object' && field in item) {
        carry.push(item[field]);
      }

      //  return the 'carry' (which is the list of matched field values)
      return carry;
    }, []);
  }

  /**
   * input 只能输入数字和小数
   */
  clearNoNum(e) {
    e.target.value = e.target.value.replace(/[^\d.]/g, '');  //  清除“数字”和“.”以外的字符
    e.target.value = e.target.value.replace(/\.{2,}/g, '.'); // 只保留第一个. 清除多余的
    e.target.value = e.target.value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
    e.target.value = e.target.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); // 只能输入两个小数
    if (e.target.value.indexOf('.') < 0 && e.target.value !== '') { // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
      e.target.value = parseFloat(e.target.value);
    }
  }
}
