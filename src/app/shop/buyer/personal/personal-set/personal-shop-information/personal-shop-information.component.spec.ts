import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalShopInformationComponent } from './personal-shop-information.component';

describe('PersonalShopInformationComponent', () => {
  let component: PersonalShopInformationComponent;
  let fixture: ComponentFixture<PersonalShopInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalShopInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalShopInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
