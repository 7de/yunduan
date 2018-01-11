import {Injectable} from '@angular/core';

@Injectable()
export class LoaderService {

  public static loadingCount: number = 0;

  constructor() {
  }

  getLoaderCount(): number {
    return LoaderService.loadingCount;
  }


  showLoading() {
    LoaderService.loadingCount++;
  }

  hideLoading() {
    LoaderService.loadingCount--;
  }
}
