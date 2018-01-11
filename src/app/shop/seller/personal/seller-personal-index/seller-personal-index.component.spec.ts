import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerPersonalIndexComponent } from './seller-personal-index.component';

describe('SellerPersonalIndexComponent', () => {
  let component: SellerPersonalIndexComponent;
  let fixture: ComponentFixture<SellerPersonalIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerPersonalIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerPersonalIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
