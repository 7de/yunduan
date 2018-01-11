import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerPersonalLayoutComponent } from './seller-personal-layout.component';

describe('SellerPersonalLayoutComponent', () => {
  let component: SellerPersonalLayoutComponent;
  let fixture: ComponentFixture<SellerPersonalLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerPersonalLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerPersonalLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
