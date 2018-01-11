import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealnameAuthComponent } from './realname-auth.component';

describe('RealnameAuthComponent', () => {
  let component: RealnameAuthComponent;
  let fixture: ComponentFixture<RealnameAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealnameAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealnameAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
