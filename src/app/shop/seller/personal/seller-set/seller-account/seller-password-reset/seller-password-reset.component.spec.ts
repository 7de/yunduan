import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerPasswordResetComponent } from './seller-password-reset.component';

describe('SellerPasswordResetComponent', () => {
  let component: SellerPasswordResetComponent;
  let fixture: ComponentFixture<SellerPasswordResetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerPasswordResetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerPasswordResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
