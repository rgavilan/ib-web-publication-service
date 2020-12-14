import { Injectable } from '@angular/core';
import { Direction, Page, PageRequest } from '../_helpers/search';
import { AbstractService } from '../_helpers/abstract';
import { HttpClient } from '@angular/common/http';
import { Binding, SparqlResults } from '../_models/sparql';

@Injectable({
  providedIn: 'root',
})
export class ResearchmentStructuresService extends AbstractService {
  // mock data
  readonly DUMMY_DATA: SparqlResults = {
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


  constructor(private httpClient: HttpClient) {
    super();
  }


  findResearchmentStructuresByFilters(
    filters: Map<string, string>, pageRequest: PageRequest
  ): Page<SparqlResults> {

    const data: SparqlResults = JSON.parse(JSON.stringify(this.DUMMY_DATA));

    return this.findResearchmentStructuresByFiltersCommon(data, filters, pageRequest);
  }

  findTopResearchmentStructuresByFilters(
    filters: Map<string, string>, pageRequest: PageRequest
  ): Page<SparqlResults> {

    const data: SparqlResults = JSON.parse(JSON.stringify(this.DUMMY_DATA));
    data.results.bindings = this.DUMMY_DATA.results.bindings.slice(0, 10);
    return this.findResearchmentStructuresByFiltersCommon(data, filters, pageRequest);
  }


  // private 
  findResearchmentStructuresByFiltersCommon(
    data: SparqlResults, filters: Map<string, string>, pageRequest: PageRequest
  ): Page<SparqlResults> {
    const page: Page<SparqlResults> = new Page<SparqlResults>();

    let dataFiltered: Binding[] = data.results.bindings;

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
    page.number = pageRequest.page - 1;
    page.numberOfElements = pageRequest.size;
    page.size = pageRequest.size;
    page.totalElements = dataFiltered.length;

    page.content = [data];

    return page;
  }
}

