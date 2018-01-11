import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeManageComponent } from './notice-manage.component';

describe('NoticeManageComponent', () => {
  let component: NoticeManageComponent;
  let fixture: ComponentFixture<NoticeManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
