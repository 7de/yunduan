import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadProtocolComponent } from './upload-protocol.component';

describe('UploadProtocolComponent', () => {
  let component: UploadProtocolComponent;
  let fixture: ComponentFixture<UploadProtocolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadProtocolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadProtocolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
