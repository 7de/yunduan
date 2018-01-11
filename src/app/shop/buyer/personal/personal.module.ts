import { NgModule } from '@angular/core';
import { ComponentModule } from '#{component}/component.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PipeModule } from '../../../pipe/pipe.module';

import { PersonalSetModule } from './personal-set/personal-set.module';

import { PersonalIndexComponent } from './personal-index/personal-index.component';
import { PersonalIndexsComponent } from './personal-index/personal-indexs/personal-indexs.component';
import {DialogModule} from 'primeng/primeng';
import {MyLivesModule} from '../../../main/lives/my-lives/my-lives.module';

@NgModule({
  imports: [
    ComponentModule,
    CommonModule,
    RouterModule,
    PipeModule,
    PersonalSetModule,
    DialogModule,
    MyLivesModule
  ],
  declarations: [
    PersonalIndexComponent,
    PersonalIndexsComponent,
  ],
  exports: [
    PersonalSetModule
  ]
})

export class PersonalModule { }
