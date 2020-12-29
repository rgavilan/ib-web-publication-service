import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { ScientistService } from 'src/app/_services/scientist.service';
import { MockScientistService } from 'src/app/_services/_testingServices/mockScientist.service';

import { TopSearchComponent } from './top-search.component';
export class TranslateServiceStub {
  public get(key: any): any {

  }
}
describe('TopSearchComponent', () => {
  let component: TopSearchComponent;
  let fixture: ComponentFixture<TopSearchComponent>;
  let scientificsService: MockScientistService;
  beforeEach(async(() => {
    TestingHelper.configureTest();
    TestBed.configureTestingModule({
      providers: [{ provide: ScientistService, useClass: MockScientistService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopSearchComponent);
    component = fixture.componentInstance;
    scientificsService = TestBed.inject(MockScientistService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('all Scientists Filtered Page Changed', () => {
    it('should change to page 2 and a result to show of 0', () => {
      component.allTopsFilteredPageChanged(2);
      spyOn(scientificsService, 'findTopByFilters').and.callThrough();
      expect(component.allTopFiltered.number).toBe(2);
      expect(component.allTopFiltered.content[0].results.bindings.length).toBe(0);
    });
  });

  describe('filter Top results', () => {
    it('should filter by type', () => {
      component.filterTop('1', 'hIndex');
      spyOn(scientificsService, 'findTopByFilters').and.callThrough();
      expect(component.allTopFiltered.totalElements).toBe(5);
    });

    it('should return all values by filtering by empty filter', () => {
      component.filterTop('undefined', 'type');
      spyOn(scientificsService, 'findTopByFilters').and.callThrough();
      expect(component.allTopFiltered.totalElements).toBe(6);
    });
  });
});
