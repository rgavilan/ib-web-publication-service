import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Page } from 'src/app/_helpers/search';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { SparqlResults } from 'src/app/_models/sparql';
import { ScientificProductionService } from 'src/app/_services/scientificProduction.service';
import { MockScientificProductionService } from 'src/app/_services/_testingServices/MockscientificProduction.service';

import { ScientificProductionComponent } from './scientific-production.component';

describe('ScientificProductionComponent', () => {
  let component: ScientificProductionComponent;
  let fixture: ComponentFixture<ScientificProductionComponent>;
  let scientificProductionService: ScientificProductionService;

  beforeEach(async(() => {
    TestingHelper.configureTest().compileComponents();
    TestBed.configureTestingModule({
      providers: [{ provide: ScientificProductionService, useClass: MockScientificProductionService }]
    }).compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(ScientificProductionComponent);
    component = fixture.componentInstance;
    scientificProductionService = TestBed.inject(ScientificProductionService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should execute ngOnInit', () => {
    spyOn(component, 'ngOnInit');
    spyOn(scientificProductionService, 'findScientificProductionByFilters').and.returnValues();
    expect(component.allScientificProductionFiltered.numberOfElements).toBe(10);
    expect(component.allScientificProductionFiltered.content.length).toBe(1);
  });

  describe('all Scientists Filtered Page Changed', () => {
    it('should change to page 2 and a result to show of 5', () => {
      component.allScientificProductionFilteredPageChanged(1);
      spyOn(scientificProductionService, 'findScientificProductionByFilters').and.callThrough();
      expect(component.allScientificProductionFiltered.number).toBe(1);
      expect(component.allScientificProductionFiltered.content[0].results.bindings.length).toBe(3);
    });
  });

  describe('filter Top results', () => {
    it('should filter by type', () => {
      component.filterResearchmentStructures('2013', 'releaseYear');
      spyOn(scientificProductionService, 'findScientificProductionByFilters').and.callThrough();
      expect(component.allScientificProductionFiltered.totalElements).toBe(1);
    });

    it('should return all values by filtering by empty filter', () => {
      component.findRequest.filter.releaseYear = 'undefined';
      component.filterResearchmentStructures('undefined', 'releaseYear');
      spyOn(scientificProductionService, 'findScientificProductionByFilters').and.callThrough();
      expect(component.allScientificProductionFiltered.totalElements).toBe(3);
    });
  });


});
