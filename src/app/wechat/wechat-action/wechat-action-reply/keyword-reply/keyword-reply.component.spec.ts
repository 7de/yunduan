import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordReplyComponent } from './keyword-reply.component';

describe('KeywordReplyComponent', () => {
  let component: KeywordReplyComponent;
  let fixture: ComponentFixture<KeywordReplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeywordReplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
