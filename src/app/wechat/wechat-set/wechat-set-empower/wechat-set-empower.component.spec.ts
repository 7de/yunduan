import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WechatSetEmpowerComponent } from './wechat-set-empower.component';

describe('WechatSetEmpowerComponent', () => {
  let component: WechatSetEmpowerComponent;
  let fixture: ComponentFixture<WechatSetEmpowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WechatSetEmpowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WechatSetEmpowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
