import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalOrderInvoiceComponent } from './personal-order-invoice.component';

describe('PersonalOrderInvoiceComponent', () => {
  let component: PersonalOrderInvoiceComponent;
  let fixture: ComponentFixture<PersonalOrderInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalOrderInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalOrderInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
