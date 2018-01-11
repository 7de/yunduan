import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivesSearchHeaderComponent } from './lives-search-header.component';

describe('LivesSearchHeaderComponent', () => {
  let component: LivesSearchHeaderComponent;
  let fixture: ComponentFixture<LivesSearchHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivesSearchHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivesSearchHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
