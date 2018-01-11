import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerEstimateSelfComponent } from './seller-estimate-self.component';

describe('SellerEstimateSelfComponent', () => {
  let component: SellerEstimateSelfComponent;
  let fixture: ComponentFixture<SellerEstimateSelfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerEstimateSelfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerEstimateSelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
