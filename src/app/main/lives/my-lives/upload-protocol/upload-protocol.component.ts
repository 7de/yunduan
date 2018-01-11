import { Component, OnInit } from '@angular/core';
import {PictureService} from '#{service}/lives/picture.service';

@Component({
  selector: 'app-upload-protocol',
  templateUrl: './upload-protocol.component.html',
  styleUrls: ['./upload-protocol.component.scss']
})
export class UploadProtocolComponent implements OnInit {

  public agreementData;

  constructor(private pictureService: PictureService) { }

  ngOnInit() {
    this.pictureService.getUploadProtocol().subscribe(
      res => {
        this.agreementData = res;
        // console.log(res);
      });
  }

}
