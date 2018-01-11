import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimateBuyerComponent } from './estimate-buyer.component';

describe('EstimateBuyerComponent', () => {
  let component: EstimateBuyerComponent;
  let fixture: ComponentFixture<EstimateBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstimateBuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimateBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
