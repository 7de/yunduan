import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerFoundationsComponent } from './manager-foundations.component';

describe('ManagerFoundationsComponent', () => {
  let component: ManagerFoundationsComponent;
  let fixture: ComponentFixture<ManagerFoundationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerFoundationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerFoundationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
