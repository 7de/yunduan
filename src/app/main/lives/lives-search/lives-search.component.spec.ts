import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivesSearchComponent } from './lives-search.component';

describe('LivesSearchComponent', () => {
  let component: LivesSearchComponent;
  let fixture: ComponentFixture<LivesSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivesSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
