import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AbstractService } from '../_helpers/abstract';
import { FindRequest, Page } from '../_helpers/search';
import { Helper } from '../_helpers/utils';
import { SparqlResults } from '../_models/sparql';

/**
 *  Service for Document
 *
 * @export
 * @extends {AbstractService}
 */
@Injectable({
    providedIn: 'root',
})
export class DocumentService extends AbstractService {

    /**
     * Creates an instance of DocumentService.
     * @param {HttpClient} httpClient
     * @memberof DocumentService
     */
    constructor(private httpClient: HttpClient) {
        super();
    }


    /**
     *
     *
     * @param {FindRequest} findRequest
     * @return {*}  {Observable<Page<SparqlResults>>}
     * @memberof DocumentService
     */
    find(findRequest: FindRequest): Observable<Page<SparqlResults>> {
        // Filter params
        let parameters = new HttpParams();
        parameters = Helper.addParam(parameters, 'types', findRequest.filter.types);
        parameters = Helper.addParam(parameters, 'name', findRequest.filter.name);
        parameters = Helper.addParam(parameters, 'ini', findRequest.filter.ini);
        parameters = Helper.addParam(parameters, 'end', findRequest.filter.end);
        // Pagination params
        parameters = Helper.addPaginationParams(parameters, findRequest.pageRequest);

        return this.httpClient
            .get(Helper.getUrl('/document/search'), {
                params: parameters
            }).pipe(
                catchError(this.handleError)
            );
    }

}
