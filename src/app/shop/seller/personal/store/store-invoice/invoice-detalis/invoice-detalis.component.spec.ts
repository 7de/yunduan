import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDetalisComponent } from './invoice-detalis.component';

describe('InvoiceDetalisComponent', () => {
  let component: InvoiceDetalisComponent;
  let fixture: ComponentFixture<InvoiceDetalisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceDetalisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceDetalisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
