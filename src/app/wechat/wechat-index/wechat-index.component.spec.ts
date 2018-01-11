import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WechatIndexComponent } from './wechat-index.component';

describe('WechatIndexComponent', () => {
  let component: WechatIndexComponent;
  let fixture: ComponentFixture<WechatIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WechatIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WechatIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
