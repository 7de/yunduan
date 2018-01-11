import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerEstimateOtherComponent } from './seller-estimate-other.component';

describe('SellerEstimateOtherComponent', () => {
  let component: SellerEstimateOtherComponent;
  let fixture: ComponentFixture<SellerEstimateOtherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerEstimateOtherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerEstimateOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
