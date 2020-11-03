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
  constructor(private httpClient: HttpClient) {
    super();
  }

  findUsers(findRequest: FindRequest): Observable<Page<ResearchmentStructure>> {
    const DUMMY_DATA: ResearchmentStructure[] = [
      {
        name: 'Universidad de Murcia',
        type: 'Universidad',
        publications: '306',
      },
      {
        name: 'Universidad de Oviedo',
        type: 'Universidad',
        publications: '297',
      },
      {
        name: 'Fundación Española para la Ciencia y la Tecnología',
        type: 'Fundación',
        publications: '25',
      },
    ];

    const page = new Page<ResearchmentStructure>();

    page.content = DUMMY_DATA;
    page.first = true;
    page.last = false;
    page.number = 1;
    page.numberOfElements = 1;
    page.size = 1;
    page.totalElements = 1;
    page.totalPages = 1;

    return of(page);
  }
}
