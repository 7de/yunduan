import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalOrderDetailComponent } from './personal-order-detail.component';

describe('PersonalOrderDetailComponent', () => {
  let component: PersonalOrderDetailComponent;
  let fixture: ComponentFixture<PersonalOrderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalOrderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
