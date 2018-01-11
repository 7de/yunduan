import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreEstimateComponent } from './store-estimate.component';

describe('StoreEstimateComponent', () => {
  let component: StoreEstimateComponent;
  let fixture: ComponentFixture<StoreEstimateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreEstimateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreEstimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
