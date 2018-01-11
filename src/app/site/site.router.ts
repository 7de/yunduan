import { RouterModule, Routes } from '@angular/router';
import { SiteComponent } from './site.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NewsComponent } from './news/news.component';
import { DetailsComponent } from './news/details/details.component';
import {ExhibitionComponent} from './exhibition/exhibition.component';
import {AppComponent} from './exhibition/app/app.component';
import {CardComponent} from './exhibition/card/card.component';
import {helpRoutes} from './help/help.router';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'news', children: [
      { path: '', redirectTo: 'news-list', pathMatch: 'full'},
      { path: 'news-list', component: NewsComponent },
      { path: 'details/:id', component: DetailsComponent }
    ]
  },
  { path: 'help', children: helpRoutes},
  { path:'exhibition',component:ExhibitionComponent,children:[
    { path: '', redirectTo: 'app', pathMatch: 'full'},
    { path: 'app', component: AppComponent },
    { path: 'card', component: CardComponent }
  ]}
];

export const SiteRouting = RouterModule.forChild([
  { path: '', component: SiteComponent, children: ROUTES }
]);
