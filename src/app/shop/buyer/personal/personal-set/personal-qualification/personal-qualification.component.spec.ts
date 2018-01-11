import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalQualificationComponent } from './personal-qualification.component';

describe('PersonalQualificationComponent', () => {
  let component: PersonalQualificationComponent;
  let fixture: ComponentFixture<PersonalQualificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalQualificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
