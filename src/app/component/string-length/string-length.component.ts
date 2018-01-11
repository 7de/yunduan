import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-string-length',
  template: `
    <span class="fs-12">{{stringLength}}/<i style="color: #B3B3B3;font-style: normal;">{{limitLength}}</i></span>
  `,
  styles: []
})
/**
 * 表单统计输入的文字数量，并且现在剩余个数的组件
 */
export class StringLengthComponent implements OnChanges {
  @Input() limitLength: number;
  @Input() dataProvider: string;
  stringLength: number;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.stringLength = this.limitLength - Number(String(changes['dataProvider'].currentValue).length);
  }

}
