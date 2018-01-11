import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashSuccessComponent } from './cash-success.component';

describe('CashSuccessComponent', () => {
  let component: CashSuccessComponent;
  let fixture: ComponentFixture<CashSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
