import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitApplyComponent } from './submit-apply.component';

describe('SubmitApplyComponent', () => {
  let component: SubmitApplyComponent;
  let fixture: ComponentFixture<SubmitApplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitApplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
