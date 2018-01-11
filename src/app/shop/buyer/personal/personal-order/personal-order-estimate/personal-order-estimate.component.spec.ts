import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalOrderEstimateComponent } from './personal-order-estimate.component';

describe('PersonalOrderEstimateComponent', () => {
  let component: PersonalOrderEstimateComponent;
  let fixture: ComponentFixture<PersonalOrderEstimateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalOrderEstimateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalOrderEstimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
