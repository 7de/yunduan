import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceSpecificationComponent } from './service-specification.component';

describe('ServiceSpecificationComponent', () => {
  let component: ServiceSpecificationComponent;
  let fixture: ComponentFixture<ServiceSpecificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceSpecificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceSpecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
