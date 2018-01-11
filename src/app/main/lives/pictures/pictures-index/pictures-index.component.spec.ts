import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicturesIndexComponent } from './pictures-index.component';

describe('PicturesIndexComponent', () => {
  let component: PicturesIndexComponent;
  let fixture: ComponentFixture<PicturesIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicturesIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicturesIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
