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
                        value: 'documento 1'
                    },
                    id: {
                        type: 'literal',
                        value: '123'
                    },
                    anyo: {
                        type: 'literal',
                        value: '2012'
                    }
                },
                // 2
                {
                    name: {
                        type: 'literal',
                        value: 'Documento 2'
                    },
                    id: {
                        type: 'literal',
                        value: '145'
                    },
                    anyo: {
                        type: 'literal',
                        value: '2015'
                    }
                }

            ]
        }
    };

    find(findRequest: FindRequest): Observable<Page<SparqlResults>> {
        // Filter params
        const page: Page<SparqlResults> = new Page<SparqlResults>();
        const results: SparqlResults = this.DUMMY_DATA;
        page.number = 0;
        page.numberOfElements = 10;
        page.size = 10;
        page.totalElements = 10;
        // TODO sort
        page.content = [results];
        return of(page);
    }




}
