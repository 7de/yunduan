import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { Config } from '#{config}/config'
import { FlashMessagesService } from '#{service}/flash-messages.service'
import { PictureService } from '#{service}/lives/picture.service'
import { LocalStorageService } from '#{service}/local-storage.service'
import { VideoService } from '#{service}/lives/video.service'
import { Router, ActivatedRoute } from '@angular/router'
import { ValidSelect } from '#{common}/shared/validator';

@Component({
  selector: 'app-upload-pictures',
  templateUrl: './upload-pictures.component.html',
  styleUrls: ['./upload-pictures.component.scss']
})
export class UploadPicturesComponent implements OnInit {

  public selectObj;
  public selectZoom: boolean;
  public picturesForm;
  public serialItem;
  public umeditorConfig = Config.umeditorConfig;
  public createBool;
  public serialSelectData;
  public isSubmit: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private flashMessages: FlashMessagesService,
    private pictureService: PictureService,
    private localStorage: LocalStorageService,
    private videoService: VideoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.picturesForm = this.formBuilder.group({
      'media_id': ['', [ValidSelect]],
      'title': ['', [Validators.required]],
      'description': ['', [Validators.required]],
      'content': ['', [Validators.required]],
      'img': ['', [Validators.required]],
      'checked': ['', [Validators.requiredTrue]]
    });
  }

  /**
   * 获取我的连载列表
   */
  getMySerialList() {
    this.createBool = true;
    this.videoService.getMySerialType().subscribe(
      res => {
        this.serialSelectData = res;
      });
  }

  /**
   * 获取图文列表
   */
  getPicturesList() {
    this.selectZoom = true
    this.pictureService.getSeriaList('1').subscribe(
      res => {
        // console.log(res);
        this.serialItem = res['items'];
      });
  }

  hideList() {
    setTimeout(() => {
      this.selectZoom = false
    }, 200)
  }

  onClick(item) {
    this.selectZoom = false
    this.selectObj = item
    this.picturesForm.get('media_id').setValue(item.id)
  }

  /**
   * 上传图文
   * @param form
   * @return {boolean}
   */
  onSubmit(form) {
    if (form.get('checked').invalid) {
      this.flashMessages.wechatprompt('请勾选云端互联网上传服务条款')
      return false
    }
    if (form.invalid || this.isSubmit) {
      return false;
    }
    this.isSubmit = true
    this.pictureService.createPictures(form.value).subscribe(
      res => {
        this.flashMessages.wechatprompt('创建图文成功')
        setTimeout(() => {
          this.router.navigate(
            ['../graphic-material'],
            {
              queryParams: { status: 'all-pictures' },
              relativeTo: this.route
            });
        }, 1000)
      },
      error => {
        this.isSubmit = false
        this.flashMessages.wechatprompt(error);
      });
  }

  /**
   * 上传图片
   */
  returnRes(event) {
    const { filename } = event
    this.picturesForm.get('img').setValue(filename)
  }

  hideDialog(e) {
    this.createBool = e;
  }
}
