import {Component, OnInit} from '@angular/core';
import {HttpClientService} from '../../../service/http-client.service';
import {LocalStorageService} from '../../../service/local-storage.service';

const MODAL_URL = '/questions';

@Component({
  selector: 'app-amend',
  templateUrl: './amend.component.html',
  styleUrls: ['./amend.component.scss']
})
export class AmendComponent implements OnInit {
  modal: Array<any> = []; // 题目数组
  result;

  constructor(private http: HttpClientService,
              private localStorage: LocalStorageService
              ) {
  }

  ngOnInit() {
    this.modals({});
    this.saveValue();
  }

  modals(params: Object) {
    Object.assign(params, {'expand': 'answers'});
    this.http.get(MODAL_URL, params).subscribe(
      result => {
        this.result = result;
        this.modal = this.result.items;
      });
  }

  saveValue() {
    this.localStorage.setObject('capacity', {'submitteds': true});
  }

  /*
   * 返回A B 等字母
   */
  selectOption(option) {
    switch (option) {
      case 1:
        return 'A、';
      case 2:
        return 'B、';
      case 3:
        return 'C、';
      case 4:
        return 'D、';
      case 5:
        return 'E、';
      default:
        return 'F、';
    }
  }
}
