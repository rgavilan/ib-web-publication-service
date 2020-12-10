import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AbstractService } from '../_helpers/abstract';
import { Direction, FindRequest, Page, PageRequest } from '../_helpers/search';
import { Helper } from '../_helpers/utils';
import { Binding, SparqlResults } from '../_models/sparql';


/**
 *
 *
 * @export
 * @class InvestigationGroupService
 * @extends {AbstractService}
 */
@Injectable({
    providedIn: 'root',
})
export class InvestigationGroupService extends AbstractService {

    /**
     * Creates an instance of InvestigationGroupService.
     * @param {HttpClient} httpClient
     * @memberof InvestigationGroupService
     */
    constructor(private httpClient: HttpClient) {
        super();
    }

    /**
     *
     *
     * @param {FindRequest} findRequest
     * @return {*}  {Observable<Page<SparqlResults>>}
     * @memberof InvestigationGroupService
     */
    find(findRequest: FindRequest): Observable<Page<SparqlResults>> {
        // Filter params
        let parameters = new HttpParams();
        parameters = Helper.addParam(parameters, 'description', findRequest.filter.description);
        // Pagination params
        parameters = Helper.addPaginationParams(parameters, findRequest.pageRequest);

        return this.httpClient
            .get(Helper.getUrl('/investigationgroup/search'), {
                params: parameters
            }).pipe(
                catchError(this.handleError)
            );
    }

}
