import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerPersonalInfoComponent } from './seller-personal-info.component';

describe('SellerPersonalInfoComponent', () => {
  let component: SellerPersonalInfoComponent;
  let fixture: ComponentFixture<SellerPersonalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerPersonalInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
