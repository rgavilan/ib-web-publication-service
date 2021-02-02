import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingHelper } from 'src/app/_helpers/testing.spec';

import { ResearchmentStructuresByQSComponent } from './researchment-structures-chart-by-qs.component';

describe('SectorChartComponent', () => {
  let component: ResearchmentStructuresByQSComponent;
  let fixture: ComponentFixture<ResearchmentStructuresByQSComponent>;

  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchmentStructuresByQSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
