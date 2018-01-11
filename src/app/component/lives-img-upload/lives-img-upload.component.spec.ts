import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivesImgUploadComponent } from './lives-img-upload.component';

describe('LivesImgUploadComponent', () => {
  let component: LivesImgUploadComponent;
  let fixture: ComponentFixture<LivesImgUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivesImgUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivesImgUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
