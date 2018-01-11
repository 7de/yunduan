import {HttpClientService} from '../../service/http-client.service';

export class BusinessComponent {

  public static version = 'business';

  constructor(protected http: HttpClientService) {
    this.http.version = BusinessComponent.version;
  }

}
