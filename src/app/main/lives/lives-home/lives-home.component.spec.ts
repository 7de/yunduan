import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivesHomeComponent } from './lives-home.component';

describe('LivesHomeComponent', () => {
  let component: LivesHomeComponent;
  let fixture: ComponentFixture<LivesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivesHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
