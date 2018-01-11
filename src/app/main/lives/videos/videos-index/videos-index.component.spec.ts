import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosIndexComponent } from './videos-index.component';

describe('VideosIndexComponent', () => {
  let component: VideosIndexComponent;
  let fixture: ComponentFixture<VideosIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideosIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
