import {Component, OnInit} from '@angular/core';
import {CompanyService} from '../../service/company.service';
import {Router} from '@angular/router';
;

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  company;
  public actives;
  constructor(
    public router: Router,
    private companyService: CompanyService
  ) {
  }

  ngOnInit() {
    this.companyService.getCompany().subscribe(res => {
      this.company = res;
      if (this.company.flag === 0 || this.company.flag === 3) {
        this.actives = true;
      }
    });
  }

  isActive() {
    if (['/main/setting/account', '/main/setting/information'].includes(this.router.url)) {
      return true;
    }
    return false;
  }
}
