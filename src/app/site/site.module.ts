import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteRouting } from './site.router';
import { ComponentModule } from '#{component}/component.module';
import { SiteComponent } from './site.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { DetailsComponent } from './news/details/details.component';
import { NewsComponent } from './news/news.component';
import { GalleriaModule } from 'primeng/components/galleria/galleria';
import { PipeModule } from '../pipe/pipe.module';
import { PaginatorModule } from 'primeng/components/paginator/paginator';
import { HotComponent } from './news/hot/hot.component';
import { ExhibitionComponent } from './exhibition/exhibition.component';
import { AppComponent } from './exhibition/app/app.component';
import { CardComponent } from './exhibition/card/card.component';
import { HelpModule } from './help/help.module';


@NgModule({
  imports: [
    SiteRouting,
    ComponentModule,
    GalleriaModule,
    PaginatorModule,
    PipeModule,
    CommonModule,
    HelpModule
  ],
  declarations: [
    SiteComponent,
    HomeComponent,
    AboutComponent,
    DetailsComponent,
    NewsComponent,
    HotComponent,
    ExhibitionComponent,
    AppComponent,
    CardComponent
  ]
})

export class SiteModule { }
