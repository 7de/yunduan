import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerPersonalMessageComponent } from './seller-personal-message.component';

describe('SellerPersonalMessageComponent', () => {
  let component: SellerPersonalMessageComponent;
  let fixture: ComponentFixture<SellerPersonalMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerPersonalMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerPersonalMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
