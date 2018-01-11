import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicturesSearchComponent } from './pictures-search.component';

describe('PicturesSearchComponent', () => {
  let component: PicturesSearchComponent;
  let fixture: ComponentFixture<PicturesSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicturesSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicturesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
