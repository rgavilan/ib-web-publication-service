import { Injectable } from '@angular/core';
import { FindRequest, Page, PageRequest } from '../_helpers/search';
import { AbstractService } from '../_helpers/abstract';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SparqlResults } from '../_models/sparql';
import { Helper } from '../_helpers/utils';
import { Observable } from 'rxjs';
import { University } from '../_models/university';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ResearchmentStructuresService extends AbstractService {
  // mock data



  constructor(private httpClient: HttpClient) {
    super();
  }


  find(findRequest: FindRequest): Observable<Page<University>> {
    // Filter params
    let parameters = new HttpParams();
    parameters = Helper.addParam(parameters, 'end', findRequest.filter.end);
    parameters = Helper.addParam(parameters, 'start', findRequest.filter.start);
    parameters = Helper.addParam(parameters, 'name', findRequest.filter.name);
    parameters = Helper.addParam(parameters, 'id', findRequest.filter.id);
    // Pagination params
    parameters = Helper.addPaginationParams(parameters, findRequest.pageRequest);

    return this.httpClient
      .get(Helper.getUrl('/university/search'), {
        params: parameters
      }).pipe(
        catchError(this.handleError)
      );
  }

}

