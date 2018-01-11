import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicMaterialComponent } from './graphic-material.component';

describe('GraphicMaterialComponent', () => {
  let component: GraphicMaterialComponent;
  let fixture: ComponentFixture<GraphicMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
