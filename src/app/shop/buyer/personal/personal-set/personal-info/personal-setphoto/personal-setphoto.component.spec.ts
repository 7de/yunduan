import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalSetphotoComponent } from './personal-setphoto.component';

describe('PersonalSetphotoComponent', () => {
  let component: PersonalSetphotoComponent;
  let fixture: ComponentFixture<PersonalSetphotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalSetphotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalSetphotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
