import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerSetComponent } from './seller-set.component';

describe('SellerSetComponent', () => {
  let component: SellerSetComponent;
  let fixture: ComponentFixture<SellerSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
