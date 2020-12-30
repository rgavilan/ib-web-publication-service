import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Page } from 'src/app/_helpers/search';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { SparqlResults } from 'src/app/_models/sparql';
import { ParticipantService } from 'src/app/_services/participant.service';
import { ProjectService } from 'src/app/_services/project.service';
import { ScientistService } from 'src/app/_services/scientist.service';
import { MockProjectService } from 'src/app/_services/_testingServices/mockProject.service';
import { MockScientistService } from 'src/app/_services/_testingServices/mockScientist.service';
import { ProjectsDetailComponent } from './projects-detail.component';

describe('ProjectsDetailComponent', () => {
  let component: ProjectsDetailComponent;
  let fixture: ComponentFixture<ProjectsDetailComponent>;
  let projectService: MockProjectService;
  const page: Page<SparqlResults> = new Page();
  const DATARESULT: SparqlResults = {
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
  page.content = [DATARESULT];
  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
    TestBed.configureTestingModule({
      providers: [{ provide: ProjectService, useClass: MockProjectService },
      {
        provide: ActivatedRoute,
        useValue: {
          params: of({ id: '123' })
        }
      }, {
        provide: ParticipantService, useValue: {
          find: () => of(page),
          findPerson: () => of(page),
        }
      }, { provide: ScientistService, useClass: MockScientistService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsDetailComponent);
    component = fixture.componentInstance;
    projectService = TestBed.inject(MockProjectService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ng on init', () => {
    it('should init instance and find project by id if it is set', () => {
      component.ngOnInit();
      expect(component.id).toBe('123');
    });
    it('should init instance and return no value in find', () => {
      const projService = fixture.debugElement.injector.get(ProjectService);
      const spy = spyOn(projService, 'find').and.returnValue(of());
      component.ngOnInit();
      expect(component.id).toBe('123');
    });

    it('expect not to receive an id', () => {
      const activatedReoute = fixture.debugElement.injector.get(ActivatedRoute);
      activatedReoute.params = of({ id: null });
      component.ngOnInit();
      expect(component.id).toBeNull();
    });
  });
});
