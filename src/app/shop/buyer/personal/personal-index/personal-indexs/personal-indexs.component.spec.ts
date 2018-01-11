import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalIndexsComponent } from './personal-indexs.component';

describe('PersonalIndexsComponent', () => {
  let component: PersonalIndexsComponent;
  let fixture: ComponentFixture<PersonalIndexsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalIndexsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalIndexsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
