import { Component, OnInit } from '@angular/core';
import { PictureService } from '#{service}/lives/picture.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pictures-index',
  templateUrl: './pictures-index.component.html',
  styleUrls: ['./pictures-index.component.scss']
})
export class PicturesIndexComponent implements OnInit {

  public serialInfo
  public picturesList
  private filter: Object = {}
  public page
  public pagination

  constructor(private ApiService: PictureService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const { params, queryParams } = this.route
    params.subscribe(params => {
      Object.assign(this.filter, { media_id: params.id })
      // 获取图文信息
      this.ApiService.getSerialInfo(params.id).subscribe(res => {
        this.serialInfo = res;
        // console.log(res);
      })
    })
    queryParams.subscribe(res => {
      Object.assign(this.filter, res)
      this.getPictureList().subscribe(res => {
        this.picturesList = res['items'];
        this.pagination = res['_meta'];
      });
    })
  }

  /**
   * 获取图文列表
   * @param id
   */
  getPictureList(params?: Object) {
    Object.assign(this.filter, params)
    return this.ApiService.getPicList(this.filter)
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
