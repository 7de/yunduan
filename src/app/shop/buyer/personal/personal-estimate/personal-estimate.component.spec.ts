import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalEstimateComponent } from './personal-estimate.component';

describe('PersonalEstimateComponent', () => {
  let component: PersonalEstimateComponent;
  let fixture: ComponentFixture<PersonalEstimateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalEstimateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalEstimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
