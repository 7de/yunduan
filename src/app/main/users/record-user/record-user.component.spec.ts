import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordUserComponent } from './record-user.component';

describe('RecordUserComponent', () => {
  let component: RecordUserComponent;
  let fixture: ComponentFixture<RecordUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
