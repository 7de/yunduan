import {ErrorHandler, Injectable} from '@angular/core';
import {FlashMessagesService} from '../../service/flash-messages.service';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {

  constructor(private flashMessages: FlashMessagesService) {
  }

  handleError(error: any): void {
    this.showErrorInConsole(error);
    this.flashMessages.error(error)
  }

  private showErrorInConsole(error: any): void {
    if (console && console.group && console.error) {
      console.group('Error Log');
      console.error(error);
      console.error(error.message);
      console.error(error.stack);
      console.groupEnd();
    }
  }
}
