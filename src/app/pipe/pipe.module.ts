import { NgModule } from '@angular/core';

import { CitySelectPipe } from './city-select.pipe';
import { DatetimePipe } from './datetime.pipe';
import { GridFormatPipe } from './grid-format.pipe';
import { HtmlPipe } from './html.pipe';
import { ImagePipe } from './image.pipe';
import { SafeUrlPipe } from './safe-url.pipe';
import { KeepHtmlPipe } from './keep-html.pipe';

@NgModule({
  declarations: [
    CitySelectPipe,
    DatetimePipe,
    GridFormatPipe,
    HtmlPipe,
    ImagePipe,
    SafeUrlPipe,
    KeepHtmlPipe
  ],
  exports: [
    CitySelectPipe,
    DatetimePipe,
    GridFormatPipe,
    HtmlPipe,
    ImagePipe,
    SafeUrlPipe,
    KeepHtmlPipe
  ]
})

export class PipeModule { }