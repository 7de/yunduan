import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomSynopsisComponent } from './classroom-synopsis.component';

describe('ClassroomSynopsisComponent', () => {
  let component: ClassroomSynopsisComponent;
  let fixture: ComponentFixture<ClassroomSynopsisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassroomSynopsisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomSynopsisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
