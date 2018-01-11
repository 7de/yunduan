import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerPasswordModifyComponent } from './seller-password-modify.component';

describe('SellerPasswordModifyComponent', () => {
  let component: SellerPasswordModifyComponent;
  let fixture: ComponentFixture<SellerPasswordModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerPasswordModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerPasswordModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
