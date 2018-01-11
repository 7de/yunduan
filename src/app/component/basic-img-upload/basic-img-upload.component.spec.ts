import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicImgUploadComponent } from './basic-img-upload.component';

describe('BasicImgUploadComponent', () => {
  let component: BasicImgUploadComponent;
  let fixture: ComponentFixture<BasicImgUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicImgUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicImgUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
