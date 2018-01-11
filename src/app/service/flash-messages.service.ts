import {Injectable} from '@angular/core';
import {Message} from 'primeng/components/common/message';

@Injectable()
export class FlashMessagesService {
  message: Message[];
  msg: Message[];

  constructor() {
    this.message = [];
    this.msg = [];
  }

  success(detail: string, summary?: string): void {
    this.message.push({
      severity: 'success', summary: summary, detail: detail
    });
  }

  info(detail: string, summary?: string): void {
    this.message.push({
      severity: 'info', summary: summary, detail: detail
    });
  }

  warning(detail: string, summary?: string): void {
    this.message.push({
      severity: 'warn', summary: summary, detail: detail
    });
  }

  error(detail: string, summary?: string): void {
    this.message.push({
      severity: 'error', summary: summary, detail: detail
    });
  }
  wechattip(detail: string, summary?: string): void {
    this.msg = [];
    this.msg.push({
      severity: 'warn', summary: summary, detail: detail
    });
  }
  wechatsuc(detail: string, summary?: string): void {
    this.msg = [];
    this.msg.push({
      severity: 'success', summary: summary, detail: detail
    });
  }
  wechaterr(detail: string, summary?: string): void {
    this.msg = [];
    this.msg.push({
      severity: 'error', summary: summary, detail: detail
    });
  }
  wechatprompt(detail: string, summary?: string): void {
    this.msg = [];
    this.msg.push({
      severity: 'info', summary: summary, detail: detail
    });
  }
}
