import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadWalletComponent } from './head-wallet.component';

describe('HeadWalletComponent', () => {
  let component: HeadWalletComponent;
  let fixture: ComponentFixture<HeadWalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadWalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
