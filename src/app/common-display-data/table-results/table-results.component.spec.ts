import { EventEmitter, SimpleChange, SimpleChanges } from '@angular/core';
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


  describe('init component without pagination in client', () => {

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
      fixture = TestBed.createComponent(TableResultsComponent);
      component = fixture.componentInstance;
      component.dataComplete = new SparqlResults();
      component.dataComplete.head = {
        vars: [
          'id'
        ]
      };
      component.dataComplete.results = {
        bindings: [{
          id: {
            type: 'literal',
            value: '1'
          }
        }, {
          id: {
            type: 'literal',
            value: '2'
          }
        }, {
          id: {
            type: 'literal',
            value: '3'
          }
        }, {
          id: {
            type: 'literal',
            value: '4'
          }
        }, {
          id: {
            type: 'literal',
            value: '5'
          }
        }, {
          id: {
            type: 'literal',
            value: '6'
          }
        }, {
          id: {
            type: 'literal',
            value: '7'
          }
        }, {
          id: {
            type: 'literal',
            value: '8'
          }
        }, {
          id: {
            type: 'literal',
            value: '9'
          }
        }, {
          id: {
            type: 'literal',
            value: '10'
          }
        }, {
          id: {
            type: 'literal',
            value: '11'
          }
        }, {
          id: {
            type: 'literal',
            value: '12'
          }
        }, {
          id: {
            type: 'literal',
            value: '13'
          }
        },
        ]
      };
      component.findRequest.pageRequest.page = 0;
      component.findRequest.pageRequest.size = 10;
      // component.findRequest.pageRequest.property = 'id';
      expect(component.findRequest.pageRequest.page).toEqual(0);
      expect(component.findRequest.pageRequest.size).toEqual(10);
      expect(component.pageInfo).not.toBeDefined();
      expect(component.dataCompleteToShow).not.toBeDefined();
      fixture.detectChanges();

    });

    it('test', () => {
      expect(component).toBeTruthy();
      // expect(component.findRequest.pageRequest.page).toEqual(0);
      // expect(component.findRequest.pageRequest.size).toEqual(10);
      expect(component.pageInfo).not.toBeDefined();
      // expect(component.dataCompleteToShow.lenght).toEqual(12);
      // expect(component.resultObject.uibPage).toEqual(1);
    });
  });

  describe('test ngOnchanges', () => {
    it('it should call find function', () => {
      const changes: SimpleChanges = null;
      spyOn(component, 'find');
      component.ngOnChanges(changes);
      expect(component.find).toHaveBeenCalled();
    });
  });

  describe('show Page', () => {
    it('should show appropiate page and order Id ASC', () => {
      component.findRequest = new FindRequest();
      component.findRequest.pageRequest.direction = Direction.ASC;
      component.findRequest.pageRequest.property = 'id';
      component.dataComplete.head = {
        vars: [
          'name',
          'id'
        ]
      };
      component.dataComplete.results = {
        bindings: [{
          id: {
            type: 'literal',
            value: '1'
          }
        }, {
          id: {
            type: 'literal',
            value: '2'
          }
        }, {
          id: {
            type: 'literal',
            value: '3'
          }
        }, {
          id: {
            type: 'literal',
            value: '4'
          }
        }, {
          id: {
            type: 'literal',
            value: '5'
          }
        }, {
          id: {
            type: 'literal',
            value: '6'
          }
        }, {
          id: {
            type: 'literal',
            value: '7'
          }
        }, {
          id: {
            type: 'literal',
            value: '8'
          }
        }, {
          id: {
            type: 'literal',
            value: '9'
          }
        }, {
          id: {
            type: 'literal',
            value: '10'
          }
        }, {
          id: {
            type: 'literal',
            value: '11'
          }
        }, {
          id: {
            type: 'literal',
            value: '12'
          }
        }, {
          id: {
            type: 'literal',
            value: '13'
          }
        },
        ]
      };

      component.showPage(0);
      fixture.detectChanges();
      expect(component.dataComplete.results.bindings[0].id.value).toBe('1');
    });

    it('should show appropiate page and order Id DESC', () => {
      component.findRequest = new FindRequest();
      component.findRequest.pageRequest.direction = Direction.DESC;
      component.findRequest.pageRequest.property = 'id';
      component.dataComplete.head = {
        vars: [
          'name',
          'id'
        ]
      };
      component.dataComplete.results = {
        bindings: [{
          id: {
            type: 'literal',
            value: '1'
          }
        }, {
          id: {
            type: 'literal',
            value: '2'
          }
        }, {
          id: {
            type: 'literal',
            value: '3'
          }
        }, {
          id: {
            type: 'literal',
            value: '4'
          }
        }, {
          id: {
            type: 'literal',
            value: '5'
          }
        }, {
          id: {
            type: 'literal',
            value: '6'
          }
        }, {
          id: {
            type: 'literal',
            value: '7'
          }
        }, {
          id: {
            type: 'literal',
            value: '8'
          }
        }, {
          id: {
            type: 'literal',
            value: '9'
          }
        }, {
          id: {
            type: 'literal',
            value: '10'
          }
        }, {
          id: {
            type: 'literal',
            value: '11'
          }
        }, {
          id: {
            type: 'literal',
            value: '12'
          }
        }, {
          id: {
            type: 'literal',
            value: '13'
          }
        },
        ]
      };
      fixture.detectChanges();
      component.showPage(0);
      expect(component.dataComplete.results.bindings[0].id.value).toBe('9');
    });
  });

  describe('callShowPageWhenPageChanges', () => {

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
      spyOn(component.pageChanged, 'emit');
      fixture.detectChanges();
      component.findRequest = new FindRequest();
      component.findRequest.pageRequest = {
        size: 3,
        page: 5,
        direction: Direction.ASC,
        property: 'id'
      };

    });

    it('without pageInfo', () => {
      component.callShowPageWhenPageChanges(1);
      expect(component.findRequest.pageRequest.page).toEqual(1);
      expect(component.resultObject.uibPage).toEqual(component.findRequest.pageRequest.page);

    });

    it('with pageInfo', () => {
      component.pageInfo = new Page();
      component.pageInfo.content = [];
      component.pageInfo.size = 10;
      component.pageInfo.number = 5;

      component.callShowPageWhenPageChanges(1);

      expect(component.findRequest.pageRequest.page).toEqual(1);
      expect(component.pageChanged.emit).toHaveBeenCalled();
    });
  });

  describe('callShowPageWhenSizeChanges', () => {

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

      spyOn(component.sizeChanged, 'emit');
      fixture.detectChanges();
      component.findRequest = new FindRequest();
      component.findRequest.pageRequest = {
        size: 3,
        page: 5,
        direction: Direction.ASC,
        property: 'id'
      };

    });

    it('without pageInfo', () => {
      component.callShowPageWhenSizeChanges(5);
      expect(component.findRequest.pageRequest.size).toEqual(5);
      expect(component.resultObject.uibPage).toEqual(component.findRequest.pageRequest.page);

    });

    it('with pageInfo', () => {
      component.pageInfo = new Page();
      component.pageInfo.content = [];
      component.pageInfo.size = 10;
      component.pageInfo.number = 5;

      component.callShowPageWhenSizeChanges(5);

      expect(component.findRequest.pageRequest.size).toEqual(5);
      expect(component.sizeChanged.emit).toHaveBeenCalled();
    });
  });

  describe('sort', () => {

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
      spyOn(component.sortChanged, 'emit');
      fixture.detectChanges();
      component.findRequest = new FindRequest();
      component.findRequest.pageRequest = {
        size: 3,
        page: 5,
        direction: Direction.ASC,
        property: 'id'
      };

    });

    it('test', () => {
      const newSort = 'id';
      component.sort(newSort);
      expect(component.findRequest.pageRequest.property).toEqual(newSort);
      expect(component.sortChanged.emit).toHaveBeenCalled();

    });
  });
});
