import { Component, OnInit } from '@angular/core';
import {PictureService} from '../../../../service/lives/picture.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-pictures-list',
  templateUrl: './pictures-list.component.html',
  styleUrls: ['./pictures-list.component.scss']
})
export class PicturesListComponent implements OnInit {

  public tabBool = {
    'hot': true,
    'new': false
  }
  public itemBool = {
    'hot': true,
    'raw': false,
    'finance': false,
    'invest': false,
    'other': false
  }
  params: any;
  pagination: any;
  public listData;
  public sort = '-pv'; // -pv:最火 -public_tiem:最近更新
  public info_type = this.route.snapshot.queryParams['info_type'] || ''; // 0 财税1 法律 2 投研 3 其他

  constructor(private pictureService: PictureService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    if (this.info_type) {
      switch (this.info_type) {  // 0 财税1 法律 2 投研 3 其他
        case '0':
          this.boolChangeFun('finance');
          break;
        case '1':
          this.boolChangeFun('raw');
          break;
        case '2':
          this.boolChangeFun('invest');
          break;
        case '3':
          this.boolChangeFun('other');
          break;
        default:
          this.boolChangeFun('hot');
          break;
      }
    }
    this.load();
  }

  boolChangeFun(type) {
    for (let key in this.itemBool) {
      if (key === type) {
        this.itemBool[key] = true;
      }else {
        this.itemBool[key] = false;
      }
    }
  }

  switchType(type) {
    switch (type) {
      case 'hot':
        this.info_type = '99';  // 99根据后台的要求
        break;
      case 'finance':
        this.info_type = '0';
        break;
      case 'raw':
        this.info_type = '1';
        break;
      case 'invest':
        this.info_type = '2';
        break;
      case 'other':
        this.info_type = '3';
        break;
      default:
        break;
    }
    this.router.navigate([this.router.url.split('?')[0]],{
      queryParams: {
        info_type: this.info_type
      },
      // queryParamsHandling: 'merge'
    });
  }

  load() {
    window.scrollTo(0, 0);
    this.route.queryParams.subscribe(params => {
      this.params = Object.assign(
        {
          page: params['page'],
          pageSize: 15
        });
      this.getPictureList();
    })
  };

  /**
   * 获取图文列表
   */
  getPictureList() {
    this.pictureService.getPicturesList(this.sort, this.info_type, this.params).subscribe(
      res => {
        this.listData = res['items'];
        this.pagination = res['_meta'];
      });
  }

  /**
   * 选择更新
   * @param status
   */
  tabChange(status) {
    for (let key in this.tabBool) {
      if (key === status) {
        this.tabBool[key] = true
      }else {
        this.tabBool[key] = !this.tabBool[key];
      }
    }
    this.router.navigate([this.router.url.split('?')[0]], {
      queryParams: {
        status: status
      },
      queryParamsHandling: 'merge'
    });
    switch (status) {
      case 'hot':
        this.sort = '-pv';
        break;
      case 'new':
        this.sort = '-public_time';
        break;
      default:
        break;
    }
    this.getPictureList();
  }
  /**
   * 选择种类
   * @param type
   */
  itemSelect(type) {
    this.boolChangeFun(type);
    this.switchType(type)
  }

  linkToIndex(id) {
    this.router.navigate(['/lives/pictures-index', id]);
    return false;
  }

  /**
   * 分页操作数据
   * @param e
   */
  paginate(e) {
    this.router.navigate([this.router.url.split('?')[0]], {
      queryParams: {
        page: e.page + 1,
      },
      queryParamsHandling: 'merge'
    });
  }

}
