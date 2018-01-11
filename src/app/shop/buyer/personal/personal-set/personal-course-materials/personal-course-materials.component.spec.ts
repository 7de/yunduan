import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalCourseMaterialsComponent } from './personal-course-materials.component';

describe('PersonalCourseMaterialsComponent', () => {
  let component: PersonalCourseMaterialsComponent;
  let fixture: ComponentFixture<PersonalCourseMaterialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalCourseMaterialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalCourseMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
