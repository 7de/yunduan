import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-reply-index',
  templateUrl: './reply-index.component.html',
  styleUrls: ['./reply-index.component.scss']
})
export class ReplyIndexComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }
  onActivate(component) {
  }

}
