import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerPersonalInformationComponent } from './seller-personal-information.component';

describe('SellerPersonalInformationComponent', () => {
  let component: SellerPersonalInformationComponent;
  let fixture: ComponentFixture<SellerPersonalInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerPersonalInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerPersonalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
