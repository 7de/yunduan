import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ComponentModule } from '#{component}/component.module';
import { PipeModule } from '#{pipe}/pipe.module';

import { SellerPersonalIndexComponent } from './seller-personal-index.component';
import { SellerPersonalIndexsComponent } from './seller-personal-indexs/seller-personal-indexs.component';
import {DialogModule} from 'primeng/primeng';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ComponentModule,
    PipeModule,
    DialogModule,
  ],
  declarations: [
    SellerPersonalIndexComponent,
    SellerPersonalIndexsComponent
  ]
})

export class SellerPersonalIndexModule { }
