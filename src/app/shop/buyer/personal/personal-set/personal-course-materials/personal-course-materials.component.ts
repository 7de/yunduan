import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { FlashMessagesService } from '#{service}/flash-messages.service'
import { VideoService } from '#{service}/lives/video.service';

@Component({
  selector: 'app-personal-course-materials',
  templateUrl: './personal-course-materials.component.html',
  styleUrls: ['./personal-course-materials.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PersonalCourseMaterialsComponent implements OnInit {

  public isCreate: boolean = false
  public formGroup
  constructor(
    private formBuilder: FormBuilder,
    private httpService: VideoService,
    private flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      nickname: ['', [Validators.required]],
      description: ['', [Validators.required]],
      img: ['', [Validators.required]]
    })
    this.httpService.getMyLivesInfo().subscribe(res => {
      if (res['info']) {
        const { nickname, description, img } = res['info']
        this.formGroup.get('nickname').setValue(nickname);
        this.formGroup.get('description').setValue(description);
        this.formGroup.get('img').setValue(img);
      } else {
        this.isCreate = true
      }
    })
  }

  getImage(img) {
    const { filename } = img
    if (filename) {
      this.formGroup.get('img').setValue(filename)
    } else {
      this.formGroup.get('img').setValue('')
    }
  }

  onSubmit(form) {
    if (form.invalid) {
      return false
    }
    this.httpService.putInfo(form.value).subscribe(res => {
      if (this.isCreate) {
        this.flashMessages.wechatprompt('创建成功')
      } else {
        this.isCreate = true
        this.flashMessages.wechatprompt('修改成功')
      }
    },
      error => {
        this.flashMessages.wechatprompt(error)
      })
  }
}
