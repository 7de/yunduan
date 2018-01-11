import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreOrderOthComponent } from './store-order-oth.component';

describe('StoreOrderOthComponent', () => {
  let component: StoreOrderOthComponent;
  let fixture: ComponentFixture<StoreOrderOthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreOrderOthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreOrderOthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
