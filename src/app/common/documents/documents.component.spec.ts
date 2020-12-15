import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { PageRequest } from 'src/app/_helpers/search';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { DocumentService } from 'src/app/_services/document.service';
import { MockDocumentService } from 'src/app/_services/_testingServices/mockDocument.service';

import { DocumentsComponent } from './documents.component';

describe('DocumentsComponent', () => {
  let component: DocumentsComponent;
  let fixture: ComponentFixture<DocumentsComponent>;
  let documentService: MockDocumentService;
  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
    TestBed.configureTestingModule({
      providers: [{ provide: DocumentService, useClass: MockDocumentService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsComponent);
    component = fixture.componentInstance;
    documentService = TestBed.inject(MockDocumentService);
    fixture.detectChanges();
  });



  it('should create execute ngOnInit and populate data table to show', () => {
    const docService1 = fixture.debugElement.injector.get(DocumentService);
    const spy = spyOn(docService1, 'find').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.allDocumentFiltered.content[0].head.vars.length).toBe(3);
    expect(component.allDocumentFiltered.content[0].results.bindings.length).not.toBe(0);
  });

  describe('on component Init', () => {
    it('should change load all elements', () => {
      const docService1 = fixture.debugElement.injector.get(DocumentService);
      const spy = spyOn(docService1, 'find').and.callThrough();
      const pageRequest: PageRequest = new PageRequest();
      pageRequest.page = 1;
      pageRequest.size = 10;
      component.ngOnInit();
      fixture.detectChanges();
      expect(component.allDocumentFiltered.totalElements).toBe(10);
    });
  });

  describe('all proyects Filtered Page Changed', () => {
    it('should change to page 1 and a result to show of 5', () => {
      component.allprojectsFilteredPageChanged(2);
      spyOn(documentService, 'find').and.callThrough();
      expect(component.findRequest.pageRequest.page).toBe(1);
    });
  });

  describe('test filterProjects', () => {
    it('should change the ini value sent to the back to corrent form', fakeAsync(() => {
      component.dateIni = 1385078400000;
      component.filterProjects();
      tick(300);
      fixture.detectChanges();
      expect(component.findRequest.filter.start).toBe('2013-11-22');
    }));

    it('should change the fin value sent to the back to corrent form', fakeAsync(() => {
      spyOn(documentService, 'find').and.callThrough();
      component.dateFin = 1385078400000;
      component.filterProjects();
      tick(300);
      fixture.detectChanges();
      expect(component.findRequest.filter.end).toBe('2013-11-22');
    }));

    it('should cnot return a valiu filter fin parse', fakeAsync(() => {
      spyOn(documentService, 'find').and.callThrough();
      component.dateFin = 138504334344378400000;
      component.filterProjects();
      tick(300);
      fixture.detectChanges();
      expect(component.findRequest.filter.end).toBeUndefined();
    }));


    it('should not return a valid filter ini parse', fakeAsync(() => {
      spyOn(documentService, 'find').and.callThrough();
      component.dateIni = 138504334344378400000;
      component.filterProjects();
      tick(300);
      fixture.detectChanges();
      expect(component.findRequest.filter.start).toBeUndefined();
    }));
  });

  describe('filterDocuments', () => {
    it('should filter document data and call service', () => {
      const documentService1 = fixture.debugElement.injector.get(DocumentService);
      const spy = spyOn(documentService1, 'find').and.callThrough();
      component.filterDocuments();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('test allprojectsFilteredSortChanged', () => {
    it('expect to call service function findProjectByFilters', () => {
      const newPageRequest: PageRequest = new PageRequest();
      newPageRequest.page = 0;
      newPageRequest.size = 10;
      component.findRequest.pageRequest = newPageRequest;
      const docService = fixture.debugElement.injector.get(DocumentService);
      const spy = spyOn(docService, 'find').and.callThrough();
      fixture.detectChanges();
      component.allprojectsFilteredSortChanged(component.findRequest.pageRequest);
      expect(spy).toHaveBeenCalledWith(component.findRequest);
    });
  });

  describe('all proyects Filtered Page Changed', () => {
    it('should change to page 1 and a result to show of 5', () => {
      component.allprojectsFilteredSizeChanged(20);
      spyOn(documentService, 'find').and.callThrough();
      expect(component.findRequest.pageRequest.size).toBe(20);
    });
  });
});
