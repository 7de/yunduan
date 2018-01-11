import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCashComponent } from './account-cash.component';

describe('AccountCashComponent', () => {
  let component: AccountCashComponent;
  let fixture: ComponentFixture<AccountCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountCashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
