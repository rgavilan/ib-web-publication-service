import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { ResearchStaffService } from 'src/app/_services/research-staff.service';
import { MockResearchStaffService } from 'src/app/_services/_testingServices/mockResearchStaff.service';

import { ScientistSearchComponent } from './scientist-search.component';

describe('ScientistSearchComponent', () => {
  let component: ScientistSearchComponent;
  let fixture: ComponentFixture<ScientistSearchComponent>;
  let researchStaffService: MockResearchStaffService;
  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
    TestBed.configureTestingModule({
      providers: [{ provide: ResearchStaffService, useClass: MockResearchStaffService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScientistSearchComponent);
    component = fixture.componentInstance;
    researchStaffService = TestBed.inject(MockResearchStaffService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('all Scientists Filtered Page Changed', () => {
    it('should change to page 2 and a result to show of 0', () => {
      component.allScientistsFilteredPageChanged(2);
      spyOn(researchStaffService, 'find').and.callThrough();
      expect(component.allScientificsFiltered.number).toBe(0);
      expect(component.allScientificsFiltered.content.length).toBe(5);
    });
  });

  describe('filter Top results', () => {
    it('should filter by type', () => {
      component.filterTop('74', 'appointments');
      spyOn(researchStaffService, 'find').and.callThrough();
      expect(component.allScientificsFiltered.totalElements).toBe(10);
    });

    it('should return all values by filtering by empty filter', () => {
      component.filterTop('undefined', 'type');
      spyOn(researchStaffService, 'find').and.callThrough();
      expect(component.allScientificsFiltered.totalElements).toBe(10);
    });
  });

});