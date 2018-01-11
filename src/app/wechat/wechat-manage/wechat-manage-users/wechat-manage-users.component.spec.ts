import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WechatManageUsersComponent } from './wechat-manage-users.component';

describe('WechatManageUsersComponent', () => {
  let component: WechatManageUsersComponent;
  let fixture: ComponentFixture<WechatManageUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WechatManageUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WechatManageUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
