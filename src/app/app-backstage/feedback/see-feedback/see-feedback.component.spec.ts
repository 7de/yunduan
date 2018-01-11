import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeFeedbackComponent } from './see-feedback.component';

describe('SeeFeedbackComponent', () => {
  let component: SeeFeedbackComponent;
  let fixture: ComponentFixture<SeeFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
