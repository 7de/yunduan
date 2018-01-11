import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerCashSuccessComponent } from './seller-cash-success.component';

describe('SellerCashSuccessComponent', () => {
  let component: SellerCashSuccessComponent;
  let fixture: ComponentFixture<SellerCashSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerCashSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerCashSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
