import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalIndexComponent } from './personal-index.component';

describe('PersonalIndexComponent', () => {
  let component: PersonalIndexComponent;
  let fixture: ComponentFixture<PersonalIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
