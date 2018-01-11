import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexBombboxComponent } from './index-bombbox.component';

describe('IndexBombboxComponent', () => {
  let component: IndexBombboxComponent;
  let fixture: ComponentFixture<IndexBombboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexBombboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexBombboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
