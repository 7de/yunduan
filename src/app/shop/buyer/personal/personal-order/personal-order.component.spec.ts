import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalOrderComponent } from './personal-order.component';

describe('PersonalOrderComponent', () => {
  let component: PersonalOrderComponent;
  let fixture: ComponentFixture<PersonalOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
