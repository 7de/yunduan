import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosDetailsComponent } from './videos-details.component';

describe('VideosDetailsComponent', () => {
  let component: VideosDetailsComponent;
  let fixture: ComponentFixture<VideosDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideosDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
