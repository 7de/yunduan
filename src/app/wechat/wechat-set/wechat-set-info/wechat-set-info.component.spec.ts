import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WechatSetInfoComponent } from './wechat-set-info.component';

describe('WechatSetInfoComponent', () => {
  let component: WechatSetInfoComponent;
  let fixture: ComponentFixture<WechatSetInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WechatSetInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WechatSetInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
