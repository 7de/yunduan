import { ErrorMessage } from 'ng-bootstrap-form-validation';

export const CUSTOM_ERRORS: ErrorMessage[] = [
  {
    error: 'required',
    format: requiredFormat
  },
  {
    error: 'minlength',
    format: minLengthFormat
  },
  {
    error: 'maxlength',
    format: maxLengthFormat
  },
  {
    error: 'validPhone',
    format: phoneFormat
  },
  {
    error: 'notEquivalent',
    format: EquivalentFormat
  },
  {
    error: 'validNum',
    format: numFormat
  },
  {
    error: 'validNum2',
    format: num2Format
  },
  {
    error: 'validPrice',
    format: priceFormat
  },
  {
    error: 'validDate',
    format: dateFormat
  },
  {
    error: 'ValidatePassword',
    format: passwordFormat
  },
  {
    error: 'ValidOldPassword',
    format: oldpasswordFormat
  },
  {
    error: 'ValidDiaGram',
    format: diagramFormat
  },
  {
    error: 'ValidSMSCode',
    format: noteFormat
  },
  {
    error: 'ValidDateTime',
    format: datetimeFormat
  },
  {
    error: 'ValidDetails',
    format: detailsFormat
  },
  {
    error: 'ValidBlend',
    format: detailsBlendFormat
  },
  {
    error: 'ValidProtocol',
    format: protocolFormat
  },
  {
    error: 'ValidPayPass',
    format: paypassFormat
  },
  {
    error: 'ValidSelect',
    format: selectFormat
  },
  {
    error: 'ValidIsEmpty',
    format: isEmptyFormat
  },
  {
    error: 'ValidTel',
    format: TelFormat
  },
  {
    error: 'ValidPayment',
    format: paymentFormat
  },
  {
    error: 'ValidEmail',
    format: emailFormat
  }
];

export function requiredFormat(label: string, error: any): string {
  const newLabel = label === 'This field' ? '' : label;
  return ` 请输入${newLabel}`;
}

export function minLengthFormat(label: string, error: any): string {
  const newLabel = label === 'This field' ? '此项' : label;
  return `${newLabel} 必须大于${error.requiredLength}位`;
}

export function maxLengthFormat(label: string, error: any): string {
  const newLabel = label === 'This field' ? '此项' : label;
  return `${newLabel} 必须小于${error.requiredLength + 1}位`;
}

export function paypassFormat(label: string, error: any): string {
  const newLabel = label === 'This field' ? '此项' : label;
  return `${newLabel}必须为6位`;
}

export function phoneFormat(label: string, error: any): string {
  const newLabel = label === 'This field' ? '' : label;
  return `${newLabel}请输入正确手机号码`;
}

export function numFormat(label: string, error: any): string {
  const newLabel = label === 'This field' ? '' : label;
  return `${newLabel}请输入正数`;
}

export function num2Format(label: string, error: any): string {
  const newLabel = label === 'This field' ? '' : label;
  return `${newLabel}请输入正数且最多保留小数点后两位`;
}

export function priceFormat(label: string, error: any): string {
  const newLabel = label === 'This field' ? '' : label;
  return `${newLabel}请输入最多7位整数且小数点后两位`;
}

export function dateFormat(label: string, error: any): string {
  const newLabel = label === 'This field' ? '' : label;
  return `${newLabel}请输入1970-01-01格式的日期`
}

export function EquivalentFormat(label: string, error: any): string {
  const newLabel = label === 'This field' ? '' : label;
  return `${newLabel}两次密码不一致，请重新输入`;
}

export function passwordFormat(label: string, error: any): string {
  const newLabel = label === 'This field' ? '' : label;
  return `${newLabel}请输入6-12位字母数字组合密码`;
}

export function oldpasswordFormat(label: string, error: any): string {
  const newLabel = label === 'This field' ? '' : label;
  return `${newLabel}请输入密码`;
}

export function diagramFormat(label: string, error: any): string {
  const newLabel = label === 'This field' ? '' : label;
  return `${newLabel}请输入图形验证码`;
}

export function noteFormat(label: string, error: any): string {
  const newLabel = label === 'This field' ? '' : label;
  return `${newLabel}请输入短信验证码`;
}

export function datetimeFormat(label: string, error: any): string {
  const newLabel = label === 'This field' ? '' : label;
  return `${newLabel}请输入日期`;
}

export function detailsFormat(label: string, error: any): string {
  const newLabel = label === 'This field' ? '' : label;
  return `${newLabel}请输入正确内容`;
}

export function detailsBlendFormat(label: string, error: any): string {
  const newLabel = label === 'This field' ? '' : label;
  return `${newLabel}请输入数字或者大小英文字母`;
}

export function protocolFormat(label: string, error: any): string {
  return '必须同意才可以继续操作';
}

export function qqFormat(label: string, error: any): string {
  const newLabel = label === 'This field' ? '' : label;
  return `${newLabel}请输入qq号码`
}

export function selectFormat(label: string, error: any): string {
  const newLabel = label === 'This field' ? '' : label;
  return `请选择${newLabel}`
}

export function isEmptyFormat(label: string, error: any): string {
  const newLabel = label === 'This field' ? '' : label;
  return `请输入${newLabel}`
}

export function TelFormat(label: string, error: any): string {
  const newLabel = label === 'This field' ? '' : label;
  return `请输入${newLabel}`
}

export function paymentFormat(label: string, error: any): string {
  const newLabel = label === 'This field' ? '' : label;
  return `请输入6位数字或者大小写字母的${newLabel}`
}

export function emailFormat(label: string, error: any): string {
  const newLabel = label === 'This field' ? '' : label;
  return `请输入正确的邮箱地址`
}