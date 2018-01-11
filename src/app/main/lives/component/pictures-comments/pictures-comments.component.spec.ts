import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicturesCommentsComponent } from './pictures-comments.component';

describe('PicturesCommentsComponent', () => {
  let component: PicturesCommentsComponent;
  let fixture: ComponentFixture<PicturesCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicturesCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicturesCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
