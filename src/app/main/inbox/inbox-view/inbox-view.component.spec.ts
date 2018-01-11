import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxViewComponent } from './inbox-view.component';

describe('InboxViewComponent', () => {
  let component: InboxViewComponent;
  let fixture: ComponentFixture<InboxViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboxViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
