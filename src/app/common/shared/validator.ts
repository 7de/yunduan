import { AbstractControl } from '@angular/forms';

// 手机号码
export function ValidatePhone(control: AbstractControl) {
  if (!control.value.match(/^1(3|4|5|7|8)\d{9}$/)) {
    return { validPhone: true };
  }
  return null;
}

// 密码-数字与字母6-12位
export function ValidatePassword(control: AbstractControl) {
  if (!control.value.match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/)) {
    return { ValidatePassword: true };
  }
  return null;
}

// 数字或者大小字母
export function ValidBlend(control: AbstractControl) {
  if (!control.value.match(/^[a-zA-Z0-9]{9,13}$/)) {
    return { ValidBlend: true };
  }
  return null;
}

// 正数
export function ValidateNum(control: AbstractControl) {
  const value = String(control.value);
  if (!value.match(/^\d+(\.\d+)?$|^\+?[1-9][0-9]*$/)) {
    return { validNum: true };
  }
  return null;
}

// 正数且保留小数点后两位
export function ValidateNum2(control: AbstractControl) {
  const value = String(control.value);
  if (!value.match(/^\d+(\.\d{0,2})?$|^\+?[1-9][0-9]*$/)) {
    return { validNum2: true };
  }
  return null;
}

// 商品价格-最多7位整数且保留小数点后两位
export function ValidatePrice(control: AbstractControl) {
  const value = String(control.value);
  if (!value.match(/^[1-9][0-9]{0,6}$|^\d{1,7}\.\d{0,2}$/)) {
    return { validPrice: true };
  }
  return null;
}


export function ValidateDate(control: AbstractControl) {
  if (!control.value.match(/\d{4}-\d{2}-\d{2}/)) {
    return { validDate: true };
  }
  return null;
}

// 密码
export function ValidOldPassword(control: AbstractControl) {
  if (!control.value) {
    return { ValidOldPassword: true };
  }
  return null;
}

// 图形验证码
export function ValidDiaGram(control: AbstractControl) {
  if (!control.value) {
    return { ValidDiaGram: true };
  }
  return null;
}

// 短信验证码
export function ValidSMSCode(control: AbstractControl) {
  if (!control.value) {
    return { ValidSMSCode: true };
  }
  return null;
}

// 日期
export function ValidDateTime(control: AbstractControl) {
  if (!control.value) {
    return { ValidDateTime: true };
  }
  return null;
}

// 内容
export function ValidDetails(control: AbstractControl) {
  if (!control.value) {
    return { ValidDetails: true };
  }
  return null;
}

// 同意协议
export function ValidProtocol(control: AbstractControl) {
  if (!control.value) {
    return { ValidProtocol: true };
  }
  return null;
}

// 密码框的提示信息
export function ValidPayPass(control: AbstractControl) {
  if (control.value && control.value.length <= 5) {
    return { ValidPayPass: true };
  }
  return null;
}

// 支付密码
export function ValidPaymentPass(control: AbstractControl) {
  if (!control.value.match(/^[a-zA-Z0-9]{6}$/)) {
    return { ValidPayment: true };
  }
  return null;
}

// QQ
export function ValidQQ(control: AbstractControl) {
  if (!control.value.match(/^[1-9]d{4,9}$/)) {
    return { ValidQQ: true }
  }
  return null;
}

// 下拉选择框必选
export function ValidSelect(control: AbstractControl) {
  if (!control.value) {
    return { ValidSelect: true };
  }
  return null;
}

// 过滤空格验证
export function ValidIsEmpty(control: AbstractControl) {
  if (!control.value.trim()) {
    return { ValidIsEmpty: true };
  }
  return null;
}

// 验证手机号格式
export function ValidTel(control: AbstractControl) {
  if (!control.value.trim() || !control.value.match(/^1(3|4|5|7|8)\d{9}$/)) {
    return { ValidTel: true };
  }
  return null;
}

// 验证邮箱
export function ValidEmail(control: AbstractControl) {
  if (control.value && !control.value.match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/)) {
    return { ValidEmail: true };
  }
  return null;
}
