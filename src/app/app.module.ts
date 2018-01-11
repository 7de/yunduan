import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GrowlModule, ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { HttpModule } from '@angular/http';

import { ComponentModule } from '#{component}/component.module';
import { ServiceModule } from '#{service}/service.module';
import { AppRouting } from './app.router';
import { SellerModule } from './shop/seller/seller.module';

import { AppComponent } from './app.component';
import {IsLoggedGuard} from './guard/is-logged.guard';

@NgModule({
  imports: [
    BrowserModule,
    ComponentModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRouting,
    SellerModule,
    ServiceModule,
    GrowlModule,
    ConfirmDialogModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    ConfirmationService,
    IsLoggedGuard
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
