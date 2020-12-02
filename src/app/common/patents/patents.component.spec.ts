import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { PatentService } from 'src/app/_services/patent.service';
import { MockPatentService } from 'src/app/_services/_testingServices/mockPatent.service';

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
      component.allprojectsFilteredPageChanged(2);
      spyOn(patentService, 'findProjectByFilters').and.callThrough();
      expect(component.findRequest.pageRequest.page).toBe(1);
    });
  });

  describe('test filterProjects', () => {
    it('expect to call filter with property set to description', fakeAsync(() => {
      component.filterProjects();
      tick(300);
      fixture.detectChanges();
      expect(component.findRequest.pageRequest.property).toBe('description');
    }));
  });

  describe('on Chart Init', () => {
    it('should change loadingData to true', () => {
      component.onChartInit();
      expect(component.loadingData).toBeTruthy();
    });
  });
});
