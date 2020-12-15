import { Injectable } from '@angular/core';
import { AbstractService } from '../_helpers/abstract';
import { Page, PageRequest } from '../_helpers/search';
import { Helper } from '../_helpers/utils';
import { SparqlResults } from '../_models/sparql';


/**
 *
 *
 * @export
 * @class ParticipantService
 * @extends {AbstractService}
 */
@Injectable({
    providedIn: 'root',
})
export class ParticipantService extends AbstractService {
    // mock data
    readonly DUMMY_DATA: SparqlResults = {
        head: {
            vars: [
                'title',
                'type',
                'doi',
                'releaseYear'
            ]
        },
        results: {
            bindings: [
                // 1
                {
                    title: {
                        type: 'literal',
                        value: 'Guía practica para la realización de trabajos de fin de grado y trabajos fin de master'
                    },
                    type: {
                        type: 'literal',
                        value: 'Libro'
                    },
                    doi: {
                        type: 'literal',
                        value: 'xxxxx'
                    },
                    releaseYear: {
                        type: 'literal',
                        value: '2012'
                    }
                },
                // 2
                {
                    title: {
                        type: 'literal',
                        value: 'Buenas prácticas para la docencia del derecho adaptado al ECTS'
                    },
                    type: {
                        type: 'literal',
                        value: 'Guía'
                    },
                    doi: {
                        type: 'literal',
                        value: 'xxxxx'
                    },
                    releaseYear: {
                        type: 'literal',
                        value: '2010'
                    }
                },
                // 3
                {
                    title: {
                        type: 'literal',
                        value: 'Dimensión social de la conservación de la fauna silvestre'
                    },
                    type: {
                        type: 'literal',
                        value: 'Guía'
                    },
                    doi: {
                        type: 'literal',
                        value: 'xxxxx'
                    },
                    releaseYear: {
                        type: 'literal',
                        value: '2013'
                    }
                }
            ]
        }
    };


    /**
     * Creates an instance of ParticipantService.
     * @memberof ParticipantService
     */
    constructor() {
        super();
    }



    /**
     *
     *
     * @param {Map<string, string>} filters
     * @param {PageRequest} pageRequest
     * @return {*}  {Page<SparqlResults>}
     * @memberof ParticipantService
     */
    find(filters: Map<string, string>, pageRequest: PageRequest): Page<SparqlResults> {
        const data: SparqlResults = JSON.parse(JSON.stringify(this.DUMMY_DATA));
        return Helper.findInServiceData(data, filters, pageRequest);
    }

}
