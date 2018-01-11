import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncreasedComponent } from './increased.component';

describe('IncreasedComponent', () => {
  let component: IncreasedComponent;
  let fixture: ComponentFixture<IncreasedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncreasedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncreasedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
