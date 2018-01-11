import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttentionReplyComponent } from './attention-reply.component';

describe('AttentionReplyComponent', () => {
  let component: AttentionReplyComponent;
  let fixture: ComponentFixture<AttentionReplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttentionReplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttentionReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
