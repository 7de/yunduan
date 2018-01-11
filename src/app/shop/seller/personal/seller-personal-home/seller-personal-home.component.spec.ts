import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerPersonalHomeComponent } from './seller-personal-home.component';

describe('SellerPersonalHomeComponent', () => {
  let component: SellerPersonalHomeComponent;
  let fixture: ComponentFixture<SellerPersonalHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerPersonalHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerPersonalHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
