import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PageRequest } from 'src/app/_helpers/search';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { ScientistService } from 'src/app/_services/scientist.service';
import { MockScientistService } from 'src/app/_services/_testingServices/mockScientist.service';

import { ScientistSearchComponent } from './scientist-search.component';

describe('ScientistSearchComponent', () => {
  let component: ScientistSearchComponent;
  let fixture: ComponentFixture<ScientistSearchComponent>;
  let scientificsService: MockScientistService;
  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
    TestBed.configureTestingModule({
      providers: [{ provide: ScientistService, useClass: MockScientistService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScientistSearchComponent);
    component = fixture.componentInstance;
    scientificsService = TestBed.inject(MockScientistService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('all Scientists Filtered Page Changed', () => {
    it('should change to page 2 and a result to show of 5', () => {
      component.allScientistsFilteredPageChanged(2);
      spyOn(scientificsService, 'findTopByFilters').and.callThrough();
      expect(component.allScientificsFiltered.number).toBe(2);
      expect(component.allScientificsFiltered.content[0].results.bindings.length).toBe(5);
    });
  });

  describe('filter Top results', () => {
    it('should filter by type', () => {
      component.filterTop('Investigador', 'type');
      spyOn(scientificsService, 'findTopByFilters').and.callThrough();
      expect(component.allScientificsFiltered.totalElements).toBe(3);
    });

    it('should return all values by filtering by empty filter', () => {
      component.filterTop('undefined', 'type');
      spyOn(scientificsService, 'findTopByFilters').and.callThrough();
      expect(component.allScientificsFiltered.totalElements).toBe(15);
    });
  });

  describe('should generate data for graphic', () => {
    it('should return all values by filtering by empty filter', () => {
      const result = component.genData(5);
      console.log('result', result);
      expect(result.seriesData.length).toBe(5);
    });
  });

});
