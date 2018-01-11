import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ShopService} from '../../service/shop.service';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {
  public stepone = '去完成 >';
  // public shopinfo = 'second_write';
  public shopinfo;
  public btn_disabled: boolean;

  constructor(private router: Router,
              private shopService: ShopService) {
  }

  ngOnInit() {
    // this.shopService.getLoginShopInfo({}).subscribe(data => {
    //   if (data === '') {
    //     this.stepone = '去完成 >';
    //     this.shopinfo = 'first_write';
    //     this.btn_disabled = true;
    //   }
    //   // else {
    //   //   this.stepone = '修改 >';
    //   //   this.shopinfo = 'second_write';
    //   //   this.btn_disabled = false;
    //   // }
    // })
  }

  // gotoInfo() {
  //   this.router.navigate(['/shop/step/step-info'], {
  //     // queryParams: {'shoptf': this.shopinfo}
  //   });
  // }

  // goIncreased() {
  //   this.router.navigate(['/seller/store/increased']);
  // }
}
