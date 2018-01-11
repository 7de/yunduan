import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreOrderEstimateComponent } from './store-order-estimate.component';

describe('StoreOrderEstimateComponent', () => {
  let component: StoreOrderEstimateComponent;
  let fixture: ComponentFixture<StoreOrderEstimateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreOrderEstimateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreOrderEstimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
