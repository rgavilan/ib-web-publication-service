import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AbstractService } from '../_helpers/abstract';
import { Direction, FindRequest, Page, PageRequest } from '../_helpers/search';
import { Helper } from '../_helpers/utils';
import { Binding, SparqlResults } from '../_models/sparql';

/**
 *  Service for scientific production
 *
 * @export
 * @extends {AbstractService}
 */
@Injectable({
    providedIn: 'root',
})
export class ProjectService extends AbstractService {
    // mock data
    readonly DUMMY_DATA: SparqlResults = {
        head: {
            vars: [
                'name',
                'keywords',
                'participation',
                'type',
                'financing',
                'convocation'
            ]
        },
        results: {
            bindings: [
                // 1
                {
                    name: {
                        type: 'literal',
                        value: 'HERCULES'
                    },
                    keywords: {
                        type: 'literal',
                        value: 'Semantica'
                    },
                    participation: {
                        type: 'literal',
                        value: 'Participante'
                    },
                    type: {
                        type: 'literal',
                        value: 'No competitivo'
                    },
                    financing: {
                        type: 'literal',
                        value: 'Publico'
                    },
                    convocation: {
                        type: 'literal',
                        value: 'H2020'
                    },
                    year: {
                        type: 'literal',
                        value: '2020'
                    }
                },
                // 2
                {
                    name: {
                        type: 'literal',
                        value: 'ASIO'
                    },
                    keywords: {
                        type: 'literal',
                        value: 'Semantica'
                    },
                    participation: {
                        type: 'literal',
                        value: 'Participante'
                    },
                    type: {
                        type: 'literal',
                        value: 'No competitivo'
                    },
                    financing: {
                        type: 'literal',
                        value: 'Publico'
                    },
                    convocation: {
                        type: 'literal',
                        value: 'A2019'
                    },
                    year: {
                        type: 'literal',
                        value: '2019'
                    }
                }
            ]
        }
    };

    /**
     * Creates an instance of ProjectService.
     * param {HttpClient} httpClient
     * memberof ProjectService
     */
    constructor(private httpClient: HttpClient) {
        super();
    }


    /**
     *
     *
     * @param {Map<string, string>} filters
     * @param {PageRequest} pageRequest
     * @return {*}  {Page<SparqlResults>}
     * @memberof ProjectService
     */
    findProjectByFilters(findRequest: FindRequest): Observable<Page<SparqlResults>> {
        // Filter params
        let parameters = new HttpParams();
        parameters = Helper.addParam(parameters, 'end', findRequest.filter.end);
        parameters = Helper.addParam(parameters, 'start', findRequest.filter.start);
        // Pagination params
        parameters = Helper.addPaginationParams(parameters, findRequest.pageRequest);

        return this.httpClient
            .get(Helper.getUrl('/project/search'), {
                params: parameters
            }).pipe(
                catchError(this.handleError)
            );
    }

}
