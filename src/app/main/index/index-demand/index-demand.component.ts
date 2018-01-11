import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index-demand',
  templateUrl: './index-demand.component.html',
  styleUrls: ['./index-demand.component.scss']
})
export class IndexDemandComponent implements OnInit {
  showBomb = false;
  demandId: number; // 需求id
  demandTitle: string; // 需求title
  public demandList = [
    {
      'id': 1,
      'name': '法律意见书',
      'ico': 'ico-release-a',
      'class': 'release-nav-a'
    },
    {
      'id': 2,
      'name': '财务规范',
      'ico': 'ico-release-b',
      'class': 'release-nav-b'
    },
    {
      'id': 3,
      'name': '税务筹划',
      'ico': 'ico-release-c',
      'class': 'release-nav-c'
    },
    {
      'id': 4,
      'name': '基金托管',
      'ico': 'ico-release-d',
      'class': 'release-nav-d'
    },
    {
      'id': 5,
      'name': '产品路演',
      'ico': 'ico-release-e',
      'class': 'release-nav-e'
    },
    {
      'id': 6,
      'name': '品牌推广',
      'ico': 'ico-release-f',
      'class': 'release-nav-f'
    },
    {
      'id': 7,
      'name': '文案策划',
      'ico': 'ico-release-g',
      'class': 'release-nav-g'
    },
    {
      'id': 8,
      'name': '资金募集',
      'ico': 'ico-release-h',
      'class': 'release-nav-h'
    }
  ];
  constructor() { }

  ngOnInit() {
  }
  // 弹框参数
  bombMethod(event) {
    if (event === 0) {
      this.showBomb = false;
    } else {
      this.showBomb = false;
    }
  }
  /* 显示弹框 */
  showbombBox(even, n, title) {
    this.showBomb = true;
    this.demandId = n;
    this.demandTitle = title;
  }

}
