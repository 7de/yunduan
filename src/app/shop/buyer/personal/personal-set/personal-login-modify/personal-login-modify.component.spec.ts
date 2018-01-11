import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalLoginModifyComponent } from './personal-login-modify.component';

describe('PersonalLoginModifyComponent', () => {
  let component: PersonalLoginModifyComponent;
  let fixture: ComponentFixture<PersonalLoginModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalLoginModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalLoginModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
