import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewedUserComponent } from './viewed-user.component';

describe('ViewedUserComponent', () => {
  let component: ViewedUserComponent;
  let fixture: ComponentFixture<ViewedUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewedUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
