import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FindRequest, Page } from 'src/app/_helpers/search';
import { SparqlResults } from 'src/app/_models/sparql';


@Injectable({
    providedIn: 'root',
})
export class MockDocumentService {
    // mock data
    readonly DUMMY_DATA: SparqlResults = {
        head: {
            vars: [
                'name',
                'area',
                'organisation',
                'id'
            ]
        },
        results: {
            bindings: [
                // 1
                {
                    name: {
                        type: 'literal',
                        value: 'Patente 1'
                    },
                    area: {
                        type: 'literal',
                        value: 'Derecho'
                    },
                    organisation: {
                        type: 'literal',
                        value: 'red.es'
                    },
                    id: {
                        type: 'literal',
                        value: 'xxxxxx'
                    }
                },
                // 2
                {
                    name: {
                        type: 'literal',
                        value: 'Patente 2'
                    },
                    area: {
                        type: 'literal',
                        value: 'Historia'
                    },
                    organisation: {
                        type: 'literal',
                        value: 'Fondos europeos'
                    },
                    id: {
                        type: 'literal',
                        value: 'xxxxxx'
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
