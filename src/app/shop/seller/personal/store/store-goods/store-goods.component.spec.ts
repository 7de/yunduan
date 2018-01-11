import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreGoodsComponent } from './store-goods.component';

describe('StoreGoodsComponent', () => {
  let component: StoreGoodsComponent;
  let fixture: ComponentFixture<StoreGoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreGoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
