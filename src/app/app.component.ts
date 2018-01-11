import {Component, ElementRef, Renderer2, OnInit, OnDestroy} from '@angular/core';
import {Message} from 'primeng/components/common/message';
import {FlashMessagesService} from './service/flash-messages.service';
import * as moment from 'moment';

// declare let moment: any;
moment.locale('zh-cn');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  private globalClickCallbackFn: Function;

  constructor(private flashMessages: FlashMessagesService, public elementRef: ElementRef, public renderer: Renderer2) {
  }

  ngOnInit() {
    this.globalClickCallbackFn = this.renderer.listen(this.elementRef.nativeElement, 'click', (event: any) => {
    });
  }

  getMessages(): Message[] {
    return this.flashMessages.message;
  }

  getMsg(): Message[] {
    return this.flashMessages.msg;
  }

  ngOnDestroy() {
    if (this.globalClickCallbackFn) {
    }
  }
}
