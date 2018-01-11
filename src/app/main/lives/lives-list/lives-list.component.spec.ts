import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivesListComponent } from './lives-list.component';

describe('LivesListComponent', () => {
  let component: LivesListComponent;
  let fixture: ComponentFixture<LivesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
