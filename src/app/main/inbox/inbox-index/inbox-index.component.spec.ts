import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxIndexComponent } from './inbox-index.component';

describe('InboxIndexComponent', () => {
  let component: InboxIndexComponent;
  let fixture: ComponentFixture<InboxIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboxIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
