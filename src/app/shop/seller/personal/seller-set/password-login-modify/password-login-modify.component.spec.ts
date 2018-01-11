import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordLoginModifyComponent } from './password-login-modify.component';

describe('PasswordLoginModifyComponent', () => {
  let component: PasswordLoginModifyComponent;
  let fixture: ComponentFixture<PasswordLoginModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordLoginModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordLoginModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
