import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicturesDetailComponent } from './pictures-detail.component';

describe('PicturesDetailComponent', () => {
  let component: PicturesDetailComponent;
  let fixture: ComponentFixture<PicturesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicturesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicturesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
