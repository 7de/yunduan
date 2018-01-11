import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-back-to-top',
  templateUrl: './back-to-top.component.html',
  styleUrls: ['./back-to-top.component.scss']
})
export class BackToTopComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  toTop() {
    let timer = null;
    timer = setInterval(() => {
      let backTop  = document.documentElement.scrollTop || document.body.scrollTop;
      let speedTop = backTop / 5;
      if (document.body.scrollTop) {
        document.body.scrollTop = backTop - speedTop;
      } else {
        document.documentElement.scrollTop = backTop - speedTop;
      }
      if (backTop === 0) {
        clearInterval(timer)
      }
    }, 30)
  }

}
