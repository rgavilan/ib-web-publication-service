import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FindRequest, Page } from 'src/app/_helpers/search';
import { SparqlResults } from 'src/app/_models/sparql';

/**
 *  Service for testiong patent service
 *
 * @export
 * @extends {AbstractService}
 */
@Injectable({
    providedIn: 'root',
})
export class MockPatentService {
    // mock data

    readonly DUMMY_DATA: SparqlResults = {
        head: {
            vars: [
                'name',
                'ini',
                'fin',
                'id',
                'tipo'
            ]
        },
        results: {
            bindings: [
                // 1
                {
                    name: {
                        type: 'literal',
                        value: 'CIRCADIANWARE'
                    },
                    ini: {
                        type: 'literal',
                        value: '15-05-1997'
                    },
                    fin: {
                        type: 'literal',
                        value: ''
                    },
                    id: {
                        type: 'literal',
                        value: '333'
                    },
                    tipo: {
                        type: 'literal',
                        value: 'D'
                    }
                },
                // 2
                {
                    name: {
                        type: 'literal',
                        value: 'NIP IMPERFECTION PROCESSOR'
                    },
                    ini: {
                        type: 'literal',
                        value: ''
                    },
                    fin: {
                        type: 'literal',
                        value: ''
                    },
                    id: {
                        type: 'literal',
                        value: '555'
                    },
                    tipo: {
                        type: 'literal',
                        value: 'D'
                    }
                }

            ]
        }
    };

    find(findRequest: FindRequest): Observable<Page<SparqlResults>> {
        // Filter params
        const page: Page<SparqlResults> = new Page<SparqlResults>();
        let results: SparqlResults = new SparqlResults();
        results = this.DUMMY_DATA;
        page.number = 0;
        page.numberOfElements = 10;
        page.size = 10;
        page.totalElements = 10;
        // TODO sort

        page.content = [results];
        return of(page);
    }




}
