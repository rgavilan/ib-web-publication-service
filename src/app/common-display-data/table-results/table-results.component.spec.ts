import { EventEmitter } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Direction, FindRequest, Page } from 'src/app/_helpers/search';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { SparqlResults } from 'src/app/_models/sparql';

import { TableResultsComponent } from './table-results.component';

describe('TableResultsComponent', () => {
  let component: TableResultsComponent;
  let fixture: ComponentFixture<TableResultsComponent>;

  beforeEach(async(() => {
    TestingHelper.configureTest().compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableResultsComponent);
    component = fixture.componentInstance;
    component.dataComplete = new SparqlResults();
    component.dataComplete.head = {
      vars: []
    };
    component.dataComplete.results = {
      bindings: []
    };
    component.dataComplete.results.bindings.length = 12;
  });


  describe('init component without pagination in client', () => {

    beforeEach(() => {
      component.dataCompleteToShow = [];
      component.dataCompleteToShow.length = 12;
      component.pageInfo = new Page();
      component.pageInfo.content = [];
      component.pageInfo.size = 10;
      component.pageInfo.number = 5;
      fixture.detectChanges();

    });

    it('test', () => {
      expect(component).toBeTruthy();
      expect(component.searchResult.length).toEqual(12);

      expect(component.resultObject.uibPage).toEqual(component.pageInfo.number);

    });

  });

  describe('init component with pagination in client', () => {

    beforeEach(() => {
      component.dataCompleteToShow = [];
      component.dataCompleteToShow.length = 12;
      fixture.detectChanges();

    });

    it('test', () => {
      expect(component).toBeTruthy();
      expect(component.searchResult.length).toEqual(10);
      expect(component.resultObject.uibPage).toEqual(1);
    });

  });

  describe('callShowPageWhenPageChanges', () => {

    beforeEach(() => {

      spyOn(component.pageChanged, 'next').and.callThrough();
      fixture.detectChanges();
      component.findRequest = new FindRequest();
      component.findRequest.pageRequest = {
        size: 3,
        page: 5,
        direction: Direction.ASC,
        property: 'name'
      };

      component.callShowPageWhenPageChanges(1);
    });

    it('without pageInfo', () => {
      expect(component.findRequest.pageRequest.page).toEqual(1);

    });

    it('with pageInfo', () => {
      component.pageInfo = new Page();
      component.pageInfo.content = [];
      component.pageInfo.size = 10;
      component.pageInfo.number = 5;
      expect(component.findRequest.pageRequest.page).toEqual(1);
      expect(component.pageChanged.next).toHaveBeenCalled();
    });
  });
});
