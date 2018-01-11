import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreInvoiceComponent } from './store-invoice.component';

describe('StoreInvoiceComponent', () => {
  let component: StoreInvoiceComponent;
  let fixture: ComponentFixture<StoreInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
