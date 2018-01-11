import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreshNoticeComponent } from './fresh-notice.component';

describe('FreshNoticeComponent', () => {
  let component: FreshNoticeComponent;
  let fixture: ComponentFixture<FreshNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreshNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreshNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
