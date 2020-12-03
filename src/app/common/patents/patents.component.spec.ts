import { HttpClient } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { PageRequest } from 'src/app/_helpers/search';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { PatentService } from 'src/app/_services/patent.service';
import { MockPatentService } from 'src/app/_services/_testingServices/mockPatent.service';
import { MockProjectService } from 'src/app/_services/_testingServices/mockProject.service';

import { PatentsComponent } from './patents.component';

describe('PatentsComponent', () => {
  let component: PatentsComponent;
  let fixture: ComponentFixture<PatentsComponent>;
  let patentService: MockPatentService;
  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
    TestBed.configureTestingModule({
      providers: [{ provide: PatentService, useClass: MockPatentService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatentsComponent);
    component = fixture.componentInstance;
    patentService = TestBed.inject(MockPatentService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('all proyects Filtered Page Changed', () => {
    it('should change to page 1 and a result to show of 5', () => {
      component.allPatentsFilteredPageChanged(2);
      spyOn(patentService, 'findProjectByFilters').and.callThrough();
      expect(component.findRequest.pageRequest.page).toBe(1);
    });
  });

  describe('test filterProjects', () => {
    it('expect to call service function findProjectByFilters', () => {
      const patentService1 = fixture.debugElement.injector.get(PatentService);
      const spy = spyOn(patentService1, 'findProjectByFilters').and.callThrough();
      fixture.detectChanges(); // update variables in fixture
      component.filterPatents();
      expect(spy).toHaveBeenCalled();
    });
  });


  describe('test allPatentsFilteredSortChanged', () => {
    it('expect to call service function findProjectByFilters', () => {
      const newPageRequest: PageRequest = new PageRequest();
      newPageRequest.page = 0;
      newPageRequest.size = 10;
      component.findRequest.pageRequest = newPageRequest;
      const patentService1 = fixture.debugElement.injector.get(PatentService);
      const spy = spyOn(patentService1, 'findProjectByFilters').and.callThrough();
      fixture.detectChanges(); // update variables in fixture
      component.allPatentsFilteredSortChanged(component.findRequest.pageRequest);
      expect(spy).toHaveBeenCalledWith(component.findRequest);
    });
  });

  describe('on Chart Init', () => {
    it('should change loadingData to true', () => {
      component.onChartInit();
      expect(component.loadingData).toBeTruthy();
    });
  });

  describe('all proyects Filtered Page Changed', () => {
    it('should change to page 1 and a result to show of 5', () => {
      component.allPatentsFilteredSizeChanged(20);
      spyOn(patentService, 'findProjectByFilters').and.callThrough();
      expect(component.findRequest.pageRequest.size).toBe(20);
    });
  });
});
