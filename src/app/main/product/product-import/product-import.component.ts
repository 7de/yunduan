import {Component, OnInit} from '@angular/core';
import {HttpClientService} from 'app/service/http-client.service';
import {FormGroup, FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MainComponent} from '../../../common/base/main-component';
import {FlashMessagesService} from '../../../service/flash-messages.service';
import {ValidDetails} from '../../../common/shared/validator';

const EXCEL_URL = '/file/upload-img?fileType=excel';
const ZIP_URL = '/file/upload-img?fileType=zip';
const IMPORT_NEW_URL = '/income/upload/new';
const IMPORT_OLD_URL = '/income/upload/history';
const PRO_URL = '/foundations';

@Component({
  selector: 'app-product-import',
  templateUrl: './product-import.component.html',
  styleUrls: ['./product-import.component.scss']
})
export class ProductImportComponent extends MainComponent implements OnInit {
  excelFileName: string;
  zipFileName: string;
  placeholder: string;
  zipFileId: number;
  excelFileId: number;
  action: number;
  products;

  formGroup: FormGroup;
  public foundationId; // 接受foundation_id

  constructor(protected http: HttpClientService,
              private route: ActivatedRoute,
              public router: Router,
              private flashMessages: FlashMessagesService) {
    super(http);
  }

  ngOnInit() {
    this.foundationId = this.route.snapshot.params['id'];
    this.action = Number(this.route.snapshot.params['action']);
    this.formGroup = new FormGroup({
      type: new FormControl('', [ValidDetails]),
      date: new FormControl('', [ValidDetails]),
      file_id: new FormControl('', [ValidDetails]),
      foundation_id: new FormControl(this.foundationId, [ValidDetails])
    });
    this.products = {};
    this.getProducts();
  }

  currAction(action) {
    if (action === 1) {
      this.router.navigate([this.router.url.split('?')[0]], {queryParams: {action: 1}})
    } else {
      this.router.navigate([this.router.url.split('?')[0]]);
    }
    this.action = action;
  }


  /**
   * 请求基金经理ID 若该公司没有投资产品，则弹窗提示引导用户至投资产品管理-新建投资产品进行操作
   */
  getProducts() {
    this.http.get(PRO_URL, {'pageSize': '1000'}).subscribe(
      result => {
        this.products = result;
      });
  }

  /**
   * 上传文件
   */
  uploadFile(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      // 历史数据导入 zip : 最新数据 excel
      const url = this.action === 1 ? ZIP_URL : EXCEL_URL;
      this.action === 1 ? this.zipFileName = file.name : this.excelFileName = file.name;
      this.http.uploadFile(url, file)
        .subscribe(
          result => {
            this.action === 1 ? this.zipFileId = result['id'] : this.excelFileId = result['id'];
          }
        )
    }
  }

  /**
   * 数据导入
   */
  importData(form) {
    if (!form.valid) {
      return false;
    }
    const formValue = form.value;
    // 历史数据导入 : 最新数据
    const url = this.action === 1 ? IMPORT_OLD_URL : IMPORT_NEW_URL;

    const params = {
      'file_id': this.action === 1 ? this.zipFileId : this.excelFileId,
      'type': formValue.type,
      'foundation_id': this.foundationId || formValue.foundation_id,
      'date': formValue.date
    };
    this.http.post(url, params).subscribe(
      result => {
        this.reset();
        this.flashMessages.wechatprompt('导入数据成功！');
      },
      error => {
        this.flashMessages.wechatprompt('导入数据失败！');
      }
    );
  }

  reset() {
    this.formGroup.reset();
    this.formGroup.controls['foundation_id'].setValue(this.foundationId);
    this.excelFileName = '';
    this.zipFileName = '';
    return false;
  }
}
