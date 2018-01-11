import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountWalletComponent } from './account-wallet.component';

describe('AccountWalletComponent', () => {
  let component: AccountWalletComponent;
  let fixture: ComponentFixture<AccountWalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountWalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
