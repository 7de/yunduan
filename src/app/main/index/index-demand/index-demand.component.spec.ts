import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexDemandComponent } from './index-demand.component';

describe('IndexDemandComponent', () => {
  let component: IndexDemandComponent;
  let fixture: ComponentFixture<IndexDemandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexDemandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexDemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
