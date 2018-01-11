import {HttpClientService} from '../../service/http-client.service';

export class MainComponent {

  public static version = 'v1';

  constructor(protected http: HttpClientService) {
    this.http.version = MainComponent.version;
  }
}
