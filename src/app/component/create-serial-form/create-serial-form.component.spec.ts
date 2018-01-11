import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSerialFormComponent } from './create-serial-form.component';

describe('CreateSerialFormComponent', () => {
  let component: CreateSerialFormComponent;
  let fixture: ComponentFixture<CreateSerialFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSerialFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSerialFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
