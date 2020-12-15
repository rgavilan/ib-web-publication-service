import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchmentStructuresByFinancingComponent } from './researchment-structures-chart-by-financing.component';

describe('ResearchmentStructuresByFinancingComponent', () => {
  let component: ResearchmentStructuresByFinancingComponent;
  let fixture: ComponentFixture<ResearchmentStructuresByFinancingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ResearchmentStructuresByFinancingComponent]
    })
      .compileComponents();
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
