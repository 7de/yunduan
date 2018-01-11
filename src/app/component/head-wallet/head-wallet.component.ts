import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-head-wallet',
  templateUrl: './head-wallet.component.html',
  styleUrls: ['./head-wallet.component.css']
})
export class HeadWalletComponent implements OnInit {

  @Input() panelTitle;
  @Input() users;
  constructor() { }

  ngOnInit() {
  }

}
