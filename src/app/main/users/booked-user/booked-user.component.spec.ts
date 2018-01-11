import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedUserComponent } from './booked-user.component';

describe('BookedUserComponent', () => {
  let component: BookedUserComponent;
  let fixture: ComponentFixture<BookedUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookedUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
