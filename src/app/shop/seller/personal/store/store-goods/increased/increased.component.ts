import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FlashMessagesService} from '#{service}/flash-messages.service';
import {GoodsService} from '#{service}/goods.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Config} from '#{config}/config';
import {HttpClientService} from '#{service}/http-client.service';
import {ValidatePrice} from '#{common}/shared/validator';


@Component({
  selector: 'app-increased',
  templateUrl: './increased.component.html',
  styleUrls: ['./increased.component.scss']
})
export class IncreasedComponent implements OnInit {
  public timer;
  editor;
  public index = 0;
  goods: any;
  public typeLists;
  public errors = {};
  fileId = [];
  public imgAry = [];
  increasedForm: FormGroup;
  public uploadFileUrl = '/upload?fileType=image';
  text: string;
  goodsId = this.route.snapshot.queryParams['id'];

  api: string = Config.apiDomain;
  umeditorConfig = Config.umeditorConfig;

  // @ViewChild('myInput') myInputVariable: any;
  constructor(private route: ActivatedRoute,
              private router: Router,
              protected http: HttpClientService,
              private flashMessages: FlashMessagesService,
              private goodService: GoodsService) {
  }

  ngOnInit() {
    this.typeList();
    if (this.goodsId) {
      this.shopInfo();
    }
    this.editor = this.editor || '';
    this.increasedForm = new FormGroup({
      demand_category_id: new FormControl('', [Validators.required]), // 所选择的服务类型
      title: new FormControl('', [Validators.required]), // 商品标题
      price: new FormControl('', [ValidatePrice]), // 商品价格
      content: new FormControl('', [Validators.required]) // 商品详情
    });
    this.typeLists = this.typeLists || [];
    window.scrollTo(0, 0);
  }

  /**
   * 上传图片
   * @param event
   */
/*  uploadImg(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0 && this.imgAry.length < 5) {
      const file: File = fileList[0];
      this.http.version = Config.mainApiBusiness;
      this.http.uploadFile(this.uploadFileUrl, file).subscribe(
        result => {
          this.imgAry.push(result['filename']);
          this.fileId.push(result['id']);
          this.errors['img'] = false;
        },
        error => {
          this.flashMessages.wechatprompt(error);
        });
    } else {
      this.flashMessages.wechatprompt('最多只能选择5张图片');
    }

  }*/

  /**
   * 删除图片
   * @param idx
   */
/*  deleteFile(idx) {
    this.myInputVariable.nativeElement.value = '';
    this.imgAry.splice(idx, 1);
    this.fileId.splice(idx, 1);
  }*/


  /**
   * 新增提交商品
   * @param form
   * @returns {boolean}
   */
  onSubmit(form) {
    if (!form.valid || this.imgAry.length < 1) {
      this.errors = Boolean(this.imgAry.length < 1);
      return false;
    }
    let formValue = form.value;
    let param = Object.assign({
      img: this.imgAry
    },formValue);
    if (this.goodsId) {
      this.update(param, this.goodsId);
    } else {
      this.create(param);
    }

  }

  /**
   * 商品基本信息
   */
  shopInfo() {
    this.goodService.getGoodsInfo({}, this.goodsId).subscribe(
      res => {
        this.goods = res;
        this.increasedForm.patchValue(Object.assign({
          title: res['title']||'',
          demand_category_id: res['demand_category_id'],
          img: res['img'],
          price: res['price'],
          content: res['content']
        }, res));
        // console.log(this.goods.images);
        // this.imgAry = this.goods.images.concat(this.imgAry).slice(0, 5);
        this.imgAry = this.goods.images
      }
    )
  }

  /**
   * 获取下拉列表
   */
  typeList() {
    this.goodService.getGoodsList({pageSize: 10}).subscribe(
      res => {
        this.typeLists = res;
      }
    )
  }

  /**
   * 新增
   * @param params
   */
  create(params) {
    this.goodService.addGoods(params, {}).subscribe(
      res => {
        this.flashMessages.wechatprompt(`<i class="ico-global ico-tip-green"></i><div class="mt-5 text-center">发布成功</div>`);
        this.timer = setTimeout( () => {
          this.router.navigateByUrl('/seller/personal/index/goods');
        }, 2000)
      })
  }

  /**
   * 修改
   * @param params
   * @param id
   */
  update(params, id) {
    this.goodService.updateGoods(params, id).subscribe(
      res => {
        this.flashMessages.wechatprompt(`<i class="ico-global ico-tip-green"></i><div class="mt-5 text-center">保存成功</div>`);
        this.timer = setTimeout( () => {
          this.router.navigateByUrl('/seller/personal/index/goods');
        }, 2000)
      }
    )
  }

}
