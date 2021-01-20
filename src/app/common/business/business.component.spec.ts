import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PageRequest } from 'src/app/_helpers/search';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { BusinnessActivityService } from 'src/app/_services/businnessActivity.service';

import { BusinessComponent } from './business.component';

describe('BusinessComponent', () => {
  let component: BusinessComponent;
  let fixture: ComponentFixture<BusinessComponent>;

  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('all events Filtered Page Changed', () => {
    it('should change to page 1 and a result to show of 5', () => {
      component.type = 'comunidades';
      component.allprojectsFilteredPageChanged(2);
      const evnService = fixture.debugElement.injector.get(BusinnessActivityService);
      spyOn(evnService, 'findComunidad').and.callThrough();
      expect(component.findRequest.pageRequest.page).toBe(1);
    });
    it('should change to page 1 and a result to show of 5', () => {
      component.type = 'centros';
      component.allprojectsFilteredPageChanged(2);
      const evnService = fixture.debugElement.injector.get(BusinnessActivityService);
      spyOn(evnService, 'findCentros').and.callThrough();
      expect(component.findRequest.pageRequest.page).toBe(1);
    });
  });

  describe('test allprojectsFilteredSortChanged', () => {
    it('expect to call service function findProjectByFilters', () => {
      component.type = 'comunidades';
      const newPageRequest: PageRequest = new PageRequest();
      newPageRequest.page = 0;
      newPageRequest.size = 10;
      component.findRequest.pageRequest = newPageRequest;
      const evnService = fixture.debugElement.injector.get(BusinnessActivityService);
      const spy = spyOn(evnService, 'findComunidad').and.callThrough();
      fixture.detectChanges();
      component.allprojectsFilteredSortChanged(component.findRequest.pageRequest);
      expect(spy).toHaveBeenCalledWith(null, component.findRequest.pageRequest);
    });
    it('expect to call service function findProjectByFilters', () => {
      component.type = 'centros';
      const newPageRequest: PageRequest = new PageRequest();
      newPageRequest.page = 0;
      newPageRequest.size = 10;
      component.findRequest.pageRequest = newPageRequest;
      const evnService = fixture.debugElement.injector.get(BusinnessActivityService);
      const spy = spyOn(evnService, 'findCentros').and.callThrough();
      fixture.detectChanges();
      component.allprojectsFilteredSortChanged(component.findRequest.pageRequest);
      expect(spy).toHaveBeenCalledWith(null, component.findRequest.pageRequest);
    });
  });

  describe('all proyects Filtered Page Changed', () => {
    it('should change to page 1 and a result to show of 5', () => {
      component.type = 'comunidades';
      const evnService = fixture.debugElement.injector.get(BusinnessActivityService);
      component.allprojectsFilteredSizeChanged(20);
      spyOn(evnService, 'findComunidad').and.callThrough();
      expect(component.findRequest.pageRequest.size).toBe(20);
    });
    it('should change to page 1 and a result to show of 5', () => {
      component.type = 'centros';
      const evnService = fixture.debugElement.injector.get(BusinnessActivityService);
      component.allprojectsFilteredSizeChanged(20);
      spyOn(evnService, 'findCentros').and.callThrough();
      expect(component.findRequest.pageRequest.size).toBe(20);
    });
  });

  it('allfilter', () => {
    component.allfilter(1);
    expect(component.loaded).toBeTruthy();
  });
});
