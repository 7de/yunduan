import {Component, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {LocalStorageService} from '#{service}/local-storage.service';
import {CompanyService} from '#{service}/company.service';
import {HttpClientService} from '#{service}/http-client.service';
import {Config} from '#{config}/config';
import {ValidateNum} from '#{common}/shared/validator';

@Component({
  selector: 'app-account-pay',
  templateUrl: './account-pay.component.html',
  styleUrls: ['./account-pay.component.scss']
})
export class AccountPayComponent implements OnInit {

  users;
  data;
  form;
  confirm;
  errMessage;
  companyType = this.localStorage.get('companyType');
  constructor(public localStorage: LocalStorageService,
              public company: CompanyService,
              public http: HttpClientService) { }


  ngOnInit() {
    if (this.companyType === '0') {
      this.users = 'buyer';
    }else if (this.companyType === '1') {
      this.users = 'seller'
    }
    this.form = new FormGroup({
      money: new FormControl('', [ValidateNum])
    });
    this.walletInfo();
  }


  walletInfo() {
    this.company.getCompany().subscribe(
      res => {
        this.data = res;
      }
    )
  }

  pay(ev) {
    if (ev.target.value < 1000) {
      return this.errMessage = true;
    } else {
      return this.errMessage = false;
    }
  }


  onSubmit(form) {
    if (form.value.money < 1000) {
      return
    }
    if (!form.valid) {
      return false;
    }
    let params = {
      'user_id': this.data['id'],
      'money': form.value.money
    };
    this.confirm = true;
    window.open(Config.apiDomain + `v1/charge?user_id=${params.user_id}&money=${params.money}`);
  }

}
