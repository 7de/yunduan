import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PictureService } from '#{service}/lives/picture.service';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PicturesComponent implements OnInit {

  constructor(
    private ApiService: PictureService
  ) { }

  ngOnInit() {
  }

  onActivate(component) {
  }
}
