import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceSettingComponent } from './invoice-setting.component';

describe('InvoiceSettingComponent', () => {
  let component: InvoiceSettingComponent;
  let fixture: ComponentFixture<InvoiceSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
