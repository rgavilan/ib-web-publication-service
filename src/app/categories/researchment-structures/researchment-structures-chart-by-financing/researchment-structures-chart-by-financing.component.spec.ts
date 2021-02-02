import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingHelper } from 'src/app/_helpers/testing.spec';

import { ResearchmentStructuresByFinancingComponent } from './researchment-structures-chart-by-financing.component';

describe('ResearchmentStructuresByFinancingComponent', () => {
  let component: ResearchmentStructuresByFinancingComponent;
  let fixture: ComponentFixture<ResearchmentStructuresByFinancingComponent>;

  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchmentStructuresByFinancingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
