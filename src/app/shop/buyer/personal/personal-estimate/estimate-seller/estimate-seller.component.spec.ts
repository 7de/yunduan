import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimateSellerComponent } from './estimate-seller.component';

describe('EstimateSellerComponent', () => {
  let component: EstimateSellerComponent;
  let fixture: ComponentFixture<EstimateSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstimateSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimateSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
