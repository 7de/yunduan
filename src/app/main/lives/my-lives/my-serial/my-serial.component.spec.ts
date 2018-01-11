import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySerialComponent } from './my-serial.component';

describe('MySerialComponent', () => {
  let component: MySerialComponent;
  let fixture: ComponentFixture<MySerialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySerialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySerialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
