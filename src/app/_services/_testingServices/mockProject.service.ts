import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FindRequest, Page } from '../../_helpers/search';
import { SparqlResults } from '../../_models/sparql';
import { ProjectService } from '../project.service';


/**
 * 
 * Class used for testing purpose
 */
@Injectable({
    providedIn: 'root',
})
export class MockProjectService extends ProjectService {
    // mock data
    readonly DUMMY_DATA: SparqlResults = {
        head: {
            vars: [
                'name',
                'end',
                'fund',
                'start',
                'tipo',
                'id'
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
                    end: {
                        type: 'literal',
                        value: ''
                    },
                    fund: {
                        type: 'literal',
                        value: '-'
                    },
                    start: {
                        type: 'literal',
                        value: ''
                    },
                    tipo: {
                        type: 'literal',
                        value: 'GRUPO'
                    },
                    id: {
                        type: 'literal',
                        value: 'H2020'
                    }
                },
                // 2
                {
                    name: {
                        type: 'literal',
                        value: 'HERCULES 1'
                    },
                    end: {
                        type: 'literal',
                        value: ' - '
                    },
                    fund: {
                        type: 'literal',
                        value: '-'
                    },
                    start: {
                        type: 'literal',
                        value: ''
                    },
                    tipo: {
                        type: 'literal',
                        value: 'GRUPO'
                    },
                    id: {
                        type: 'literal',
                        value: 'H2021'
                    }
                },
                {
                    name: {
                        type: 'literal',
                        value: 'HERCULES 3'
                    },
                    end: {
                        type: 'literal',
                        value: ''
                    },
                    fund: {
                        type: 'literal',
                        value: '-'
                    },
                    start: {
                        type: 'literal',
                        value: ''
                    },
                    tipo: {
                        type: 'literal',
                        value: 'CON'
                    },
                    id: {
                        type: 'literal',
                        value: 'H2022'
                    }
                }
            ]
        }
    };

    /**
     *
     *
     * @param {FindRequest} findRequest
     * @return {*}  {Observable<Page<SparqlResults>>}
     * @memberof MockProjectService
     */
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
