import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StringLengthComponent } from './string-length.component';

describe('StringLengthComponent', () => {
  let component: StringLengthComponent;
  let fixture: ComponentFixture<StringLengthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StringLengthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StringLengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
