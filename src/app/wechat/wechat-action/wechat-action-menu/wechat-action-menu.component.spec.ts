import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WechatActionMenuComponent } from './wechat-action-menu.component';

describe('WechatActionMenuComponent', () => {
  let component: WechatActionMenuComponent;
  let fixture: ComponentFixture<WechatActionMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WechatActionMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WechatActionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
