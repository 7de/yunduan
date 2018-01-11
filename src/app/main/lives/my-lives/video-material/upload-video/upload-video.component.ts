import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { VideoService } from '#{service}/lives/video.service'
import { FlashMessagesService } from '#{service}/flash-messages.service'
import { Router, ActivatedRoute } from '@angular/router'
import { ValidSelect } from '#{common}/shared/validator';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: [
    '../../graphic-material/upload-pictures/upload-pictures.component.scss',
    './upload-video.component.scss'
  ],
  // encapsulation: ViewEncapsulation.None
})

export class UploadVideoComponent implements OnInit {

  public formGroup
  public errors = {}
  public serialItem
  public selectObj
  public selectZoom: boolean = false
  public imgSrc
  public videoSrc
  public isSubmit: boolean = false
  public createBool: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private httpService: VideoService,
    private flashMessages: FlashMessagesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.httpService.getMySerial({ media_type: 0 }).subscribe(res => {
      res['items'].forEach(element => {
        Object.assign(element, { value: element.id })
      });
      this.serialItem = res['items']
    })
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      'media_id': ['', [ValidSelect]],
      'url': ['', [Validators.required]],
      'img': ['', [Validators.required]],
      'title': ['', [Validators.required]],
      'description': ['', [Validators.required]],
      'checked': ['', [Validators.requiredTrue]]
    })
  }

  /**
   * 获取视频连载列表
   */
  showList() {
    this.selectZoom = true
    this.httpService.getMySerial({ media_type: 0 }).subscribe(res => {
      this.serialItem = res['items']
    })
  }
  hideList() {
    setTimeout(() => {
      this.selectZoom = false
    }, 200)
  }

  onClick(item) {
    this.selectZoom = false
    this.selectObj = item
    this.formGroup.get('media_id').setValue(item.id)
  }

  /**
   * 视频上传
   */
  getVideo(event) {
    const { filename } = event
    this.formGroup.get('url').setValue(filename)
  }

  /**
   * 图片上传
   */
  getImage(event) {
    const { filename } = event
    this.formGroup.get('img').setValue(filename)
  }

  /**
   * 表单提交
   */
  onSubmit(form) {
    if (form.get('checked').invalid) {
      this.flashMessages.wechatprompt('请勾选云端互联网上传服务条款')
      return false
    }
    if (form.invalid || this.isSubmit) {
      return false
    }

    this.isSubmit = true
    this.httpService.create(form.value).subscribe(
      res => {
        this.flashMessages.wechatprompt('创建视频成功')
        setTimeout(() => {
          this.router.navigate(
            ['../video-material'],
            {
              queryParams: { status: 'all-videos' },
              relativeTo: this.route
            });
        }, 1000)
      },
      error => {
        this.isSubmit = false
        this.flashMessages.wechatprompt(error)
      }
    )
  }

  /**
   * 创建连载弹窗--显示
   */
  getMySerialList() {
    this.createBool = true;
  }
  /**
   * 创建连载弹窗--隐藏
   */
  hideDialog(e) {
    this.createBool = e;
  }
}
