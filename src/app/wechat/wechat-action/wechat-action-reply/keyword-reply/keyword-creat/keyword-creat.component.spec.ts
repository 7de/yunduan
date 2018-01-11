import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordCreatComponent } from './keyword-creat.component';

describe('KeywordCreatComponent', () => {
  let component: KeywordCreatComponent;
  let fixture: ComponentFixture<KeywordCreatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeywordCreatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordCreatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
