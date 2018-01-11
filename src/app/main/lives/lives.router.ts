import {RouterModule, Routes} from '@angular/router';
import {PicturesIndexComponent} from './pictures/pictures-index/pictures-index.component';
import {PicturesListComponent} from './pictures/pictures-list/pictures-list.component';
import {VideosIndexComponent} from './videos/videos-index/videos-index.component';
import {VideosDetailsComponent} from './videos/videos-details/videos-details.component';
import {LivesIndexComponent} from './lives-index/lives-index.component';
import {LivesHomeComponent} from './lives-home/lives-home.component';
import {PicturesDetailComponent} from './pictures/pictures-detail/pictures-detail.component';
import {PicturesVoiceComponent} from './pictures/pictures-voice/pictures-voice.component';
import {LivesSearchComponent} from './lives-search/lives-search.component';
import {PicturesComponent} from './pictures/pictures.component';
import {LivesListComponent} from './lives-list/lives-list.component';
import {VideosListComponent} from './videos/videos-list/videos-list.component';
import {UploadProtocolComponent} from 'app/main/lives/my-lives/upload-protocol/upload-protocol.component';


// PATH = /lives
const livesRouter: Routes = [
  { path: 'lives-home', component: LivesHomeComponent },
  { path: 'lives-index', component: LivesIndexComponent },
  { path: 'lives-search', component: LivesSearchComponent },
  { path: 'lives-list', component: LivesListComponent },
  { path: 'upload-protocol', component: UploadProtocolComponent },
]

const picturesRoutes: Routes = [
  { path: 'pictures-index/:id', component: PicturesIndexComponent },
  { path: 'pictures-list', component: PicturesListComponent },
  { path: 'pictures-detail/:id', component: PicturesDetailComponent },
  { path: 'pictures-voice/:id', component: PicturesVoiceComponent },
]

const videoRoutes: Routes = [
  { path: 'videos-index', component: VideosIndexComponent },
  { path: 'videos-details', component: VideosDetailsComponent },
  { path: 'videos-list', component: VideosListComponent },
]

export const LivesRouting = RouterModule.forChild([
  { path: '', children: livesRouter },
  { path: '', component: PicturesComponent, children: videoRoutes },
  { path: '', component: PicturesComponent, children: picturesRoutes }
]);
