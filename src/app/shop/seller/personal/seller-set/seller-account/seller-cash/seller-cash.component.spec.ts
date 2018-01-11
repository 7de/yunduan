import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerCashComponent } from './seller-cash.component';

describe('SellerCashComponent', () => {
  let component: SellerCashComponent;
  let fixture: ComponentFixture<SellerCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerCashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
