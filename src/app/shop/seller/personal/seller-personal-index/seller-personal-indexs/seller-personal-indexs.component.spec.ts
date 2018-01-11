import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerPersonalIndexsComponent } from './seller-personal-indexs.component';

describe('SellerPersonalIndexsComponent', () => {
  let component: SellerPersonalIndexsComponent;
  let fixture: ComponentFixture<SellerPersonalIndexsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerPersonalIndexsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerPersonalIndexsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
