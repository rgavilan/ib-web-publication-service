import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicComponent } from './graphic.component';

describe('GraphicComponent', () => {
  let component: GraphicComponent;
  let fixture: ComponentFixture<GraphicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [GraphicComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init component', () => {
    const resultDelay1 = component.echartOptions.series[0].animationDelay(2);
    const resultDelay2 = component.echartOptions.series[1].animationDelay(3);
    const delay = component.echartOptions.animationDelayUpdate(2);
    component.ngOnInit();
    expect(resultDelay1).toBe(20);
    expect(resultDelay2).toBe(130);
    expect(delay).toBe(10);
    expect(component.data.name).toBe('categoria');
  });
});
