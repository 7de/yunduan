import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadsShopComponent } from './heads-shop.component';

describe('HeadsShopComponent', () => {
  let component: HeadsShopComponent;
  let fixture: ComponentFixture<HeadsShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadsShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadsShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
