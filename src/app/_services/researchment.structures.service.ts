import { Injectable } from '@angular/core';
import { FindRequest, Page, Direction } from '../_helpers/search';
import { ResearchmentStructure } from '../_models/researchmentStructure';
import { Helper } from '../_helpers/utils';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AbstractService } from '../_helpers/abstract';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResearchmentStructuresService extends AbstractService {
  // mock data
  readonly DUMMY_DATA: ResearchmentStructure[] = [
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
  ];
  constructor(private httpClient: HttpClient) {
    super();
  }

  findUsers(findRequest: FindRequest): Observable<Page<ResearchmentStructure>> {
    return of(this.findResearchmentStructures(findRequest));
  }

  findResearchmentStructuresByFilters(
    filters: Map<String, String>
  ): Page<ResearchmentStructure> {
    var page: Page<ResearchmentStructure> = new Page<ResearchmentStructure>();
    page.content = this.DUMMY_DATA;
    filters.forEach((valueFilter: string, keyFilter: string) => {
      if (!!valueFilter) {
        page.content = page.content.filter((researchmentStructure) => {
          for (let keyObject of Object.keys(researchmentStructure)) {
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

  findTopResearchmentStructuresByFilters(
    filters: Map<String, String>
  ): Page<ResearchmentStructure> {
    var page: Page<ResearchmentStructure> = new Page<ResearchmentStructure>();
    page.content = this.DUMMY_DATA;
    filters.forEach((valueFilter: string, keyFilter: string) => {
      if (!!valueFilter) {
        page.content = page.content.filter((researchmentStructure) => {
          for (let keyObject of Object.keys(researchmentStructure)) {
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
}
