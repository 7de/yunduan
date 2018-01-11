import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicturesVoiceComponent } from './pictures-voice.component';

describe('PicturesVoiceComponent', () => {
  let component: PicturesVoiceComponent;
  let fixture: ComponentFixture<PicturesVoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicturesVoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicturesVoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
