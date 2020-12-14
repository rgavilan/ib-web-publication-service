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
                'anyo',
                'name',
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
                    id: {
                        type: 'literal',
                        value: 'Derecho'
                    },
                    anyo: {
                        type: 'literal',
                        value: 'red.es'
                    }
                },
                // 2
                {
                    name: {
                        type: 'literal',
                        value: 'Patente 2'
                    },
                    id: {
                        type: 'literal',
                        value: 'Historia'
                    },
                    anyo: {
                        type: 'literal',
                        value: 'Fondos europeos'
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
