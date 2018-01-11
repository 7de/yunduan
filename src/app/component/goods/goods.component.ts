import {Component, Input, OnInit, SimpleChanges, OnChanges} from '@angular/core';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.scss']
})
export class GoodsComponent implements OnInit, OnChanges {

  @Input() goodsData;
  @Input() shopId; // 店铺Id
  // qqFirst = 'tencent://message/?v=3&amp;uin=';
  // qqLast = '&amp;site=qq&amp;menu=yes';

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.dir(changes['count'])
  }

  /**
   * 处理评级别
   *
   * @param score  传入评分值
   * @return
   */
/*  getScores(score) {
    let scoreFloat = String(score).split('.');
    if (scoreFloat.length > 1) {
      if (Number(scoreFloat[1]) > 5) {
        scoreFloat[1] = '9';
      } else if (Number(scoreFloat[1]) > 0 && Number(scoreFloat[1]) < 5) {
        scoreFloat[1] = '5';
      }
    }
    return Number(scoreFloat.join('.'));
  }*/
}
