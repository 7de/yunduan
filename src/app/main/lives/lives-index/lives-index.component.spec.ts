import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivesIndexComponent } from './lives-index.component';

describe('LivesIndexComponent', () => {
  let component: LivesIndexComponent;
  let fixture: ComponentFixture<LivesIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivesIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivesIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
