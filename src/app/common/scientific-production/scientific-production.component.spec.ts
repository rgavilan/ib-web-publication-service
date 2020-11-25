import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Page } from 'src/app/_helpers/search';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { SparqlResults } from 'src/app/_models/sparql';
import { ScientificProductionService } from 'src/app/_services/scientificProduction.service';

import { ScientificProductionComponent } from './scientific-production.component';

describe('ScientificProductionComponent', () => {
  let component: ScientificProductionComponent;
  let fixture: ComponentFixture<ScientificProductionComponent>;
  let scientificProductionService: ScientificProductionService;
  const page: Page<SparqlResults> = new Page();
  const DUMMY_DATA: SparqlResults = {
    head: {
      vars: [
        'title',
        'type',
        'doi',
        'releaseYear'
      ]
    },
    results: {
      bindings: [
        // 1
        {
          title: {
            type: 'literal',
            value: 'Guía practica para la realización de trabajos de fin de grado y trabajos fin de master'
          },
          type: {
            type: 'literal',
            value: 'Libro'
          },
          doi: {
            type: 'literal',
            value: 'xxxxx'
          },
          releaseYear: {
            type: 'literal',
            value: '2012'
          }
        },
        // 2
        {
          title: {
            type: 'literal',
            value: 'Buenas prácticas para la docencia del derecho adaptado al ECTS'
          },
          type: {
            type: 'literal',
            value: 'Guía'
          },
          doi: {
            type: 'literal',
            value: 'xxxxx'
          },
          releaseYear: {
            type: 'literal',
            value: '2010'
          }
        },
        // 3
        {
          title: {
            type: 'literal',
            value: 'Dimensión social de la conservación de la fauna silvestre'
          },
          type: {
            type: 'literal',
            value: 'Guía'
          },
          doi: {
            type: 'literal',
            value: 'xxxxx'
          },
          releaseYear: {
            type: 'literal',
            value: '2013'
          }
        }
      ]
    }
  };
  beforeEach(async(() => {
    page.number = 1;
    page.numberOfElements = 10;
    page.size = 10;
    page.totalElements = 10;
    // TODO sort

    page.content = [DUMMY_DATA];
    console.log(page);
    TestingHelper.configureTest().compileComponents();
    TestBed.configureTestingModule({
      providers: [{
        provide: ScientificProductionService, useValue: {
          findScientificProductionByFilters: () => page,
          findScientifiProductionByFiltersCommon: () => page
        }
      }]
    }).compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(ScientificProductionComponent);
    component = fixture.componentInstance;
    scientificProductionService = TestBed.inject(ScientificProductionService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should execute ngOnInit', () => {
    spyOn(component, 'ngOnInit');
    spyOn(scientificProductionService, 'findScientificProductionByFilters').and.returnValues();
    expect(component.allScientificProductionFiltered.numberOfElements).toBe(10);
    expect(component.allScientificProductionFiltered.content.length).toBe(1);
  });


});
