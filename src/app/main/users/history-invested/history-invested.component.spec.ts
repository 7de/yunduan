import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryInvestedComponent } from './history-invested.component';

describe('HistoryInvestedComponent', () => {
  let component: HistoryInvestedComponent;
  let fixture: ComponentFixture<HistoryInvestedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryInvestedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryInvestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
