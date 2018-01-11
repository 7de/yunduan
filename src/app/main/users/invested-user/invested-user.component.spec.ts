import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestedUserComponent } from './invested-user.component';

describe('InvestedUserComponent', () => {
  let component: InvestedUserComponent;
  let fixture: ComponentFixture<InvestedUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestedUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
