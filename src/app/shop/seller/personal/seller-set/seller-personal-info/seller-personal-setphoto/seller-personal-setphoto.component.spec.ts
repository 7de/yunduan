import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerPersonalSetphotoComponent } from './seller-personal-setphoto.component';

describe('SellerPersonalSetphotoComponent', () => {
  let component: SellerPersonalSetphotoComponent;
  let fixture: ComponentFixture<SellerPersonalSetphotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerPersonalSetphotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerPersonalSetphotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
