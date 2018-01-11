import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicturesListComponent } from './pictures-list.component';

describe('PicturesListComponent', () => {
  let component: PicturesListComponent;
  let fixture: ComponentFixture<PicturesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicturesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicturesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
