import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { Page, PageRequest } from 'src/app/_helpers/search';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { SparqlResults } from 'src/app/_models/sparql';
import { ParticipantService } from 'src/app/_services/participant.service';
import { PatentService } from 'src/app/_services/patent.service';
import { MockPatentService } from 'src/app/_services/_testingServices/mockPatent.service';

import { DeliverableComponent } from './deliverable.component';

describe('DeliverableComponent', () => {
  let component: DeliverableComponent;
  let fixture: ComponentFixture<DeliverableComponent>;
  const DUMMY_DATA: SparqlResults = {
    head: {
      vars: [
        'anyo',
        'name',
        'id'
      ]
    },
    results: {
      bindings: [
        // 1
        {
          name: {
            type: 'literal',
            value: 'documento 1'
          },
          id: {
            type: 'literal',
            value: '123'
          },
          anyo: {
            type: 'literal',
            value: '2012'
          }
        },
        // 2
        {
          name: {
            type: 'literal',
            value: 'Documento 2'
          },
          id: {
            type: 'literal',
            value: '145'
          },
          anyo: {
            type: 'literal',
            value: '2015'
          }
        }

      ]
    }
  };
  const page: Page<SparqlResults> = new Page();
  page.content = [DUMMY_DATA];

  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
    TestBed.configureTestingModule({
      providers: [
        { provide: PatentService, useClass: MockPatentService }, {
          provide: ParticipantService, useValue: {
            find: () => of(page),
            findPerson: () => of(page),
          }
        }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init component', fakeAsync(() => {
    component.ngOnInit();
    tick(400);
    expect(component.loaded).toBeTruthy();
  }));

  it('allfilter', () => {
    component.allfilter(1);
    expect(component.loaded).toBeTruthy();
  });

  it('allprojectsFilteredPageChanged', () => {
    component.allprojectsFilteredPageChanged(1);
    expect(component.loaded).toBeTruthy();
  });

  it('allprojectsFilteredSizeChanged', () => {
    component.allprojectsFilteredSizeChanged(1);
    expect(component.loaded).toBeTruthy();
  });
  it('allprojectsFilteredSizeChanged', () => {
    const pager: PageRequest = new PageRequest();
    component.allprojectsFilteredSortChanged(pager);
    expect(component.loaded).toBeTruthy();
  });
});
