import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadsSingleComponent } from './heads-single.component';

describe('HeadsSingleComponent', () => {
  let component: HeadsSingleComponent;
  let fixture: ComponentFixture<HeadsSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadsSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadsSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
