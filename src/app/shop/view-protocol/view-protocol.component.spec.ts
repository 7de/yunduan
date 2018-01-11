import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProtocolComponent } from './view-protocol.component';

describe('ViewProtocolComponent', () => {
  let component: ViewProtocolComponent;
  let fixture: ComponentFixture<ViewProtocolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProtocolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProtocolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
