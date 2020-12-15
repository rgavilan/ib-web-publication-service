import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { Page, PageRequest } from 'src/app/_helpers/search';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { SparqlResults } from 'src/app/_models/sparql';
import { ParticipantService } from 'src/app/_services/participant.service';

import { ParticipantsComponent } from './participants.component';

describe('ParticipantsComponent', () => {
  let component: ParticipantsComponent;
  let fixture: ComponentFixture<ParticipantsComponent>;
  const page: Page<SparqlResults> = new Page();
  const DATA: SparqlResults = {
    head: {
      vars: [
        'anyo',
        'description',
        'id'
      ]
    },
    results: {
      bindings: [
        // 1
        {
          description: {
            type: 'literal',
            value: 'description 1'
          },
          id: {
            type: 'literal',
            value: '13'
          },
          anyo: {
            type: 'literal',
            value: '2011'
          }
        },
        // 2
        {
          description: {
            type: 'literal',
            value: 'description 2'
          },
          id: {
            type: 'literal',
            value: '1435'
          },
          anyo: {
            type: 'literal',
            value: '2025'
          }
        }

      ]
    }
  };
  page.content = [DATA];
  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
    TestBed.configureTestingModule({
      providers: [{
        provide: ParticipantService, useValue: {
          find: () => of(page),
        }
      }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should init component', fakeAsync(() => {
    component.ngOnInit();
    tick(450);
    expect(component.loaded).toBeTruthy();
  }));

  it('allfilter', () => {
    component.allScientistsFilteredPageChanged(1);
    expect(component.loaded).toBeTruthy();
  });

  it('allParticipantsFilteredPageChanged', () => {
    component.allParticipantsFilteredPageChanged(1);
    expect(component.loaded).toBeTruthy();
  });

  it('allParticipantsFilteredSizeChanged', () => {
    component.allParticipantsFilteredSizeChanged(1);
    expect(component.loaded).toBeTruthy();
  });
  it('allParticipantsFilteredSortChanged', () => {
    const pager: PageRequest = new PageRequest();
    component.allParticipantsFilteredSortChanged(pager);
    expect(component.loaded).toBeTruthy();
  });
});
