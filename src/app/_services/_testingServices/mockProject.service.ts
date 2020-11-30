import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Helper } from 'src/app/_helpers/utils';
import { Direction, FindRequest, Page, PageRequest } from '../../_helpers/search';
import { Binding, SparqlResults } from '../../_models/sparql';
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

    findProjectByFilters(findRequest: FindRequest): Observable<Page<SparqlResults>> {
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
