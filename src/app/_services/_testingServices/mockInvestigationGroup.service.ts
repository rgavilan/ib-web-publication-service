import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Direction, FindRequest, Page, PageRequest } from 'src/app/_helpers/search';
import { Binding, SparqlResults } from 'src/app/_models/sparql';
import { PatentService } from '../patent.service';

/**
 *  Service for testiong patent service
 *
 * @export
 * @extends {AbstractService}
 */
@Injectable({
    providedIn: 'root',
})
export class MockInvestigationGroupService extends PatentService {
    // mock data
    readonly DUMMY_DATA: SparqlResults = {
        head: {
            vars: [
                'fin',
                'id',
                'ini',
                'name',
                'tipo'
            ]
        },
        results: {
            bindings: [
                {
                    fin: {
                        type: 'literal',
                        value: ''
                    },
                    id: {
                        type: 'literal',
                        value: '1'
                    },
                    ini: {
                        type: 'literal',
                        value: ''
                    },
                    name: {
                        type: 'literal',

                        value: 'PROGRAMA DE ORDENADOR PARA LA APLICACION DE LA ISO 9000 EN CENTROS DE HEMODONACIÓN'
                    },
                    tipo: {
                        type: 'literal',

                        value: 'D'
                    }
                },
                {
                    fin: {
                        type: 'literal',

                        value: ''
                    },
                    id: {
                        type: 'literal',

                        value: '12'
                    },
                    ini: {
                        type: 'literal',

                        value: '15-05-1997'
                    },
                    name: {
                        type: 'literal',

                        value: 'DISPOSITIVO PARA REALIZAR RADIOGRAFIAS PANORAMICAS DE MUÑECA'
                    },
                    tipo: {
                        type: 'literal',

                        value: 'P'
                    }
                },
                {
                    fin: {
                        type: 'literal',

                        value: ''
                    },
                    id: {
                        type: 'literal',

                        value: '13'
                    },
                    ini: {
                        type: 'literal',

                        value: ''
                    },
                    name: {
                        type: 'literal',

                        value: 'CIRCADIANWARE'
                    },
                    tipo: {
                        type: 'literal',

                        value: 'D'
                    }
                },
                {
                    fin: {
                        type: 'literal',

                        value: ''
                    },
                    id: {
                        type: 'literal',

                        value: '48'
                    },
                    ini: {
                        type: 'literal',

                        value: ''
                    },
                    name: {
                        type: 'literal',

                        value: 'NIP IMPERFECTION PROCESSOR'
                    },
                    tipo: {
                        type: 'literal',

                        value: 'D'
                    }
                },
                {
                    fin: {
                        type: 'literal',

                        value: ''
                    },
                    id: {
                        type: 'literal',

                        value: '49'
                    },
                    ini: {
                        type: 'literal',

                        value: ''
                    },
                    name: {
                        type: 'literal',

                        value: 'PARKINSON-SNM'
                    },
                    tipo: {
                        type: 'literal',

                        value: 'D'
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
