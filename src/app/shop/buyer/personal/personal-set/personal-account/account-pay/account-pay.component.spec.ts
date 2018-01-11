import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPayComponent } from './account-pay.component';

describe('AccountPayComponent', () => {
  let component: AccountPayComponent;
  let fixture: ComponentFixture<AccountPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
