import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalSetComponent } from './personal-set.component';

describe('PersonalSetComponent', () => {
  let component: PersonalSetComponent;
  let fixture: ComponentFixture<PersonalSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
