import { Injectable } from '@angular/core';
import { Direction, FindRequest, Page, PageRequest } from '../_helpers/search';
import { ResearchmentStructure } from '../_models/researchmentStructure';
import { Observable } from 'rxjs';
import { AbstractService } from '../_helpers/abstract';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { Scientist } from '../_models/scientist';
import { Binding, SparqlResults } from '../_models/sparql';

@Injectable({
  providedIn: 'root',
})
export class ResearchmentStructuresService extends AbstractService {
  // mock data
  readonly DUMMY_DATA2: SparqlResults = {
    head: {
      vars: [
        'name',
        'type',
        'publications'
      ]
    },
    results: {
      bindings: [
        // 1
        {
          name: {
            type: 'literal',
            value: 'Universidad Pompeu Fabra'
          },
          type: {
            type: 'literal',
            value: 'Universidad'
          },
          publications: {
            type: 'literal',
            value: '1420'
          }
        },
        // 2
        {
          name: {
            type: 'literal',
            value: 'Universidad Politécnica de Cataluña'
          },
          type: {
            type: 'literal',
            value: 'Universidad'
          },
          publications: {
            type: 'literal',
            value: '1389'
          }
        },
        // 3
        {
          name: {
            type: 'literal',
            value: 'Universidad Carlos III'
          },
          type: {
            type: 'literal',
            value: 'Universidad'
          },
          publications: {
            type: 'literal',
            value: '879'
          }
        },
        // 4
        {
          name: {
            type: 'literal',
            value: 'Universidad Politécnica de Valencia'
          },
          type: {
            type: 'literal',
            value: 'Universidad'
          },
          publications: {
            type: 'literal',
            value: '985'
          }
        },
        // 5
        {
          name: {
            type: 'literal',
            value: 'Universidad de Murcia'
          },
          type: {
            type: 'literal',
            value: 'Universidad'
          },
          publications: {
            type: 'literal',
            value: '406'
          }
        },
        // 6
        {
          name: {
            type: 'literal',
            value: 'Universidad de  Oviedo'
          },
          type: {
            type: 'literal',
            value: 'Universidad'
          },
          publications: {
            type: 'literal',
            value: '398'
          }
        },
        // 7
        {
          name: {
            type: 'literal',
            value: 'Fundación Española para la Ciencia y la Tecnología'
          },
          type: {
            type: 'literal',
            value: 'Fundación'
          },
          publications: {
            type: 'literal',
            value: '85'
          }
        },
        // 8
        {
          name: {
            type: 'literal',
            value: 'Universitat Oberta de Catalunya'
          },
          type: {
            type: 'literal',
            value: 'Universidad'
          },
          publications: {
            type: 'literal',
            value: '138'
          }
        },
        // 9
        {
          name: {
            type: 'literal',
            value: 'Universidad nacional de educación a distancia'
          },
          type: {
            type: 'literal',
            value: 'Fundación'
          },
          publications: {
            type: 'literal',
            value: '299'
          }
        },
        // 10
        {
          name: {
            type: 'literal',
            value: 'Universidad de Cantabria'
          },
          type: {
            type: 'literal',
            value: 'Universidad'
          },
          publications: {
            type: 'literal',
            value: '97'
          }
        },
        // 11
        {
          name: {
            type: 'literal',
            value: 'Universidad de Pais Vasco'
          },
          type: {
            type: 'literal',
            value: 'Universidad'
          },
          publications: {
            type: 'literal',
            value: '642'
          }
        },
      ]
    }
  };
  readonly DUMMY_DATA: ResearchmentStructure[] = [
    {
      name: 'Universidad Pompeu Fabra',
      type: 'Universidad',
      publications: '1420',
      qa: [],
    },
    {
      name: 'Universidad Politécnica de Cataluña',
      type: 'Universidad',
      publications: '1389',
      qa: [],
    },
    {
      name: 'Universidad Carlos III',
      type: 'Universidad',
      publications: '924',
      qa: [],
    },
    {
      name: 'Universidad Politécnica de Valencia',
      type: 'Universidad',
      publications: '878',
      qa: [],
    },
    {
      name: 'Universidad de Murcia',
      type: 'Universidad',
      publications: '306',
      qa: ['Severo Ochoa'],
    },
    {
      name: 'Universidad de Oviedo',
      type: 'Universidad',
      publications: '297',
      qa: ['Severo Ochoa'],
    },
    {
      name: 'Fundación Española para la Ciencia y la Tecnología',
      type: 'Fundación',
      publications: '25',
      qa: [],
    },
    {
      name: 'Universitat Oberta de Catalunya',
      type: 'Universidad',
      publications: '125',
      qa: [],
    },
    {
      name: 'Universidad nacional de educación a distancia',
      type: 'Universidad',
      publications: '409',
      qa: [],
    },
    {
      name: 'Universidad de Cantabria',
      type: 'Universidad',
      publications: '408',
      qa: [],
    },
    {
      name: 'Universidad País Vasco',
      type: 'Universidad',
      publications: '399',
      qa: [],
    },
  ];

  readonly DUMMY_DATA_SCIENTIST: Scientist[] = [
    {
      id: '4343434',
      name: 'María Hernandez Reyes Mora',
      type: 'Docente',
      publications: 8,
      area: ['EYT', 'ENE'],
      areaName: ['Energía y transporte', 'Energía'],
    },
    {
      id: 'f445344',
      name: 'Jesualdo Tomás Fernandes Breis',
      type: 'Docente',
      publications: 14,
      area: ['CTQ', 'IQM'],
      areaName: ['Ciencias y tecnologías quimicas', 'Ingeniería Química'],
    }
  ];
  constructor(private httpClient: HttpClient) {
    super();
  }

  // findUsers(findRequest: FindRequest): Observable<Page<ResearchmentStructure>> {
  //   return of(this.findResearchmentStructures(findRequest));
  // }

  findResearchmentStructuresByFilters(
    filters: Map<string, string>, pageRequest: PageRequest
  ): Page<ResearchmentStructure> {

    const page: Page<ResearchmentStructure> = new Page<ResearchmentStructure>();
    page.content = this.DUMMY_DATA;
    filters.forEach((valueFilter: string, keyFilter: string) => {
      if (!!valueFilter) {
        page.content = page.content.filter((researchmentStructure) => {
          for (const keyObject of Object.keys(researchmentStructure)) {
            if (
              keyObject === keyFilter &&
              researchmentStructure[keyObject] === valueFilter
            ) {
              return true;
            }
          }
        });
      }
    });

    page.first = true;
    page.last = false;
    page.number = 1;
    page.numberOfElements = 1;
    page.size = 1;
    page.totalElements = 1;
    page.totalPages = 1;

    return page;
  }

  findResearchmentStructuresByFilters2(
    filters: Map<string, string>, pageRequest: PageRequest
  ): Page<SparqlResults> {
    const page: Page<SparqlResults> = new Page<SparqlResults>();
    const data: SparqlResults = JSON.parse(JSON.stringify(this.DUMMY_DATA2));

    let dataFiltered: Binding[] = this.DUMMY_DATA2.results.bindings;

    // Filters
    if (!!filters) {
      filters.forEach((valueFilter: string, keyFilter: string) => {
        if (!!valueFilter) {
          dataFiltered = data.results.bindings = data.results.bindings.filter((binding: Binding) => {
            for (const keyObject of Object.keys(binding)) {
              if (
                keyObject === keyFilter &&
                binding[keyObject].value === valueFilter
              ) {
                return true;
              }
            }
          });
        }
      });
    }

    // Order
    if (!!pageRequest && !!pageRequest.property) {
      page.sort = pageRequest.property;
      page.direction = pageRequest.direction;
      data.results.bindings = data.results.bindings.sort((a, b) => {
        if (pageRequest.direction === Direction.ASC) {
          return (a[pageRequest.property].value > b[pageRequest.property].value) ? 1 : -1;
        }
        return (a[pageRequest.property].value <= b[pageRequest.property].value) ? 1 : -1;
      });
    }

    const min = ((!!pageRequest.page) ? pageRequest.page - 1 : 0) * pageRequest.size;
    const max = ((!!pageRequest.page) ? pageRequest.page : 1) * pageRequest.size;
    data.results.bindings = data.results.bindings.slice(min, max)
    page.number = pageRequest.page;
    page.numberOfElements = pageRequest.size;
    page.size = pageRequest.size;
    page.totalElements = dataFiltered.length;
    // TODO sort

    page.content = [data];

    return page;
  }

  findTopResearchmentStructuresByFilters(
    filters: Map<string, string>
  ): Page<ResearchmentStructure> {
    const page: Page<ResearchmentStructure> = new Page<ResearchmentStructure>();
    page.content = this.DUMMY_DATA.slice(0, 10);
    filters.forEach((valueFilter: string, keyFilter: string) => {
      if (!!valueFilter) {
        page.content = page.content.filter((researchmentStructure) => {
          for (const keyObject of Object.keys(researchmentStructure)) {
            if (
              keyObject === keyFilter &&
              researchmentStructure[keyObject].indexOf(valueFilter) > -1
            ) {
              return true;
            }
          }
        });
      }
    });

    page.first = true;
    page.last = false;
    page.number = 1;
    page.numberOfElements = 1;
    page.size = 1;
    page.totalElements = 1;
    page.totalPages = 1;

    return page;
  }

  findResearchmentStructures(
    findRequest: FindRequest
  ): Page<ResearchmentStructure> {
    const page = new Page<ResearchmentStructure>();

    page.content = this.DUMMY_DATA;
    page.first = true;
    page.last = false;
    page.number = 1;
    page.numberOfElements = 1;
    page.size = 1;
    page.totalElements = 1;
    page.totalPages = 1;

    return page;
  }


  getById(id: string): Observable<any> {
    const DUMMY_DATA_ID = {
      name: 'Universidad Pompeu Fabra',
      type: 'Universidad',
      publications: '1420',
      address: 'Avenida. Teniente Flomesta, 5, 30003. Murcia',
      tel: '+34 868 88 3000 (centralita) / +34 868 88 8888 (centralita)'
    };
    return of(DUMMY_DATA_ID);
  }

  findResearchmentScientist(findRequest: FindRequest): Page<Scientist> {
    const page = new Page<Scientist>();

    page.content = this.DUMMY_DATA_SCIENTIST;
    page.first = true;
    page.last = false;
    page.number = 1;
    page.numberOfElements = 1;
    page.size = 1;
    page.totalElements = 1;
    page.totalPages = 1;

    return page;
  }

  findTopResearchmentStructuresScientistByFilters(
    filters: Map<string, string>
  ): Page<Scientist> {
    const page: Page<Scientist> = new Page<Scientist>();
    page.content = this.DUMMY_DATA_SCIENTIST.slice(0, 10);
    filters.forEach((valueFilter: string, keyFilter: string) => {
      if (!!valueFilter) {
        page.content = page.content.filter((researchmentStructure) => {
          for (const keyObject of Object.keys(researchmentStructure)) {
            if (
              keyObject === keyFilter &&
              researchmentStructure[keyObject].indexOf(valueFilter) > -1
            ) {
              return true;
            }
          }
        });
      }
    });

    page.first = true;
    page.last = false;
    page.number = 1;
    page.numberOfElements = 1;
    page.size = 1;
    page.totalElements = 1;
    page.totalPages = 1;

    return page;
  }

  filterArea(filters: Map<string, Array<string>>): Page<Scientist> {
    const page: Page<Scientist> = new Page<Scientist>();
    page.content = this.DUMMY_DATA_SCIENTIST.slice(0, 10);
    filters.forEach((valueFilter, keyFilter) => {
      if (!!valueFilter && valueFilter.length !== 0) {
        page.content = page.content.filter((researchmentStructure) => {
          for (const keyObject of Object.keys(researchmentStructure)) {
            if (keyObject === keyFilter && researchmentStructure[keyObject].some((val) => valueFilter.indexOf(val) !== -1)) {
              return true;
            }
          }
        });
      }
    });

    page.first = true;
    page.last = false;
    page.number = 1;
    page.numberOfElements = 1;
    page.size = 1;
    page.totalElements = 1;
    page.totalPages = 1;

    return page;
  }
}

