import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { VideoService } from "#{service}/lives/video.service";
import { FlashMessagesService } from "#{service}/flash-messages.service";
import { PictureService } from "#{service}/lives/picture.service";

@Component({
  selector: 'app-create-serial-form',
  templateUrl: './create-serial-form.component.html',
  styleUrls: ['./create-serial-form.component.scss']
})
export class CreateSerialFormComponent implements OnInit, OnChanges {

  public options: any = [];
  public livesBool;
  public serialForm;
  public imgSrc;
  public errors = {};
  @Input() media_type; // '0':视频 '1':图文  测试
  @Input() mediaId;
  @Input() createBool;
  @Output() result = new EventEmitter;

  constructor(
    private formBuilder: FormBuilder,
    private videoService: VideoService,
    private flashMessages: FlashMessagesService,
    private pictureService: PictureService
  ) {
    this.serialForm = this.formBuilder.group({
      'serialTitle': ['', [Validators.required]],
      'selectSerialName': ['', [Validators.required]],
      'serialDes': ['', [Validators.required]],
    });
    this.getMySerialList();
  }

  ngOnInit() {

  }

  ngOnChanges() {
    if (this.createBool && this.mediaId) {
      this.editSerial(this.mediaId);
    } else {
      this.initForm();
    }
  }

  initForm() {
    this.imgSrc = '';
    this.serialForm.reset()
  }

  /**
   * 编辑连载
   */
  editSerial(id) {
    this.videoService
      .getSerialInfo(id)
      .subscribe(res => {
        this.imgSrc = res['img'];
        this.serialForm.get('serialTitle').setValue(res['title']);
        this.serialForm.get('selectSerialName').setValue(res['info_type']);
        this.serialForm.get('serialDes').setValue(res['description']);
      });
  }

  /**
   * 创建连载
   * @param form
   * @return {boolean}
   */
  onSubmit(form) {
    if (!form.valid || !this.imgSrc) {
      this.errors['img'] = !Boolean(this.imgSrc);
      return false;
    }
    let val = form.value;
    let obj = {
      title: val.serialTitle,
      img: this.imgSrc,
      info_type:
        form.value.selectSerialName,
      description: form.value.serialDes,
      media_type: this.media_type
    };
    this.videoService.createSerial(obj, this.mediaId).subscribe(
      res => {
        this.result.emit(false);
        if (this.mediaId) {
          this.flashMessages.wechatprompt('编辑连载成功');
        } else {
          this.flashMessages.wechatprompt('创建连载成功');
        }
      },
      error => {
        // console.log(error)
        this.flashMessages.wechatprompt(error);
      })
  }

  /**
   * 上传图片
   * @param ev
   */
  returnRes(event) {
    this.imgSrc = event['filename'];
  }

  /**
   * 获取我的连载列表
   */
  getMySerialList() {
    this.videoService
      .getMySerialType()
      .subscribe(res => {
        for (let i in res) {
          this.options.push({ label: res[i], value: i })
        }
      });
  }

}
