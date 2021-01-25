import { Injectable } from '@angular/core';
import { AbstractService } from '../_helpers/abstract';
import { Page, PageRequest } from '../_helpers/search';
import { Helper } from '../_helpers/utils';
import { SparqlResults } from '../_models/sparql';


/**
 *
 *
 * @export
 * @class EventsService
 * @extends {AbstractService}
 */
@Injectable({
    providedIn: 'root',
})
export class EventsService extends AbstractService {
    // mock data
    readonly DUMMY_DATA: SparqlResults = {
        head: {
            vars: [
                'id',
                'title',
                'type',
                'rol',
                'place',
                'date'
            ]
        },
        results: {
            bindings: [
                // 1
                {
                    id: {
                        type: 'literal',
                        value: '111'
                    },
                    title: {
                        type: 'literal',
                        value: 'IV Congreso sobre semántica web de España'
                    },
                    type: {
                        type: 'literal',
                        value: 'Congreso'
                    },
                    rol: {
                        type: 'literal',
                        value: 'Organizador'
                    },
                    place: {
                        type: 'literal',
                        value: 'Universidad de Murcia'
                    },
                    date: {
                        type: 'literal',
                        value: '25-05-2004'
                    }
                },
                // 2
                {
                    id: {
                        type: 'literal',
                        value: '222'
                    },
                    title: {
                        type: 'literal',
                        value: 'XII Congreso sobre dirección de proyectos PMP'
                    },
                    type: {
                        type: 'literal',
                        value: 'Congreso'
                    },
                    rol: {
                        type: 'literal',
                        value: 'Expositor'
                    },
                    place: {
                        type: 'literal',
                        value: 'Izertis Gijón'
                    },
                    date: {
                        type: 'literal',
                        value: '25-05-2019'
                    }
                },
                {
                    id: {
                        type: 'literal',
                        value: '2323'
                    },
                    title: {
                        type: 'literal',
                        value: 'I Taller sobre semántica Web Universidad de Oviedo'
                    },
                    type: {
                        type: 'literal',
                        value: 'Workshop'
                    },
                    rol: {
                        type: 'literal',
                        value: 'Expositor'
                    },
                    place: {
                        type: 'literal',
                        value: 'Politecnica UO'
                    },
                    date: {
                        type: 'literal',
                        value: '03-11-2016'
                    }
                }

            ]
        }
    };



    constructor() {
        super();
    }



    /**
     *
     *
     * @param {Map<string, string>} filters
     * @param {PageRequest} pageRequest
     * @return {*}  {Page<SparqlResults>}
     * @memberof EventsService
     */
    find(filters: Map<string, string>, pageRequest: PageRequest): Page<SparqlResults> {
        const data: SparqlResults = JSON.parse(JSON.stringify(this.DUMMY_DATA));
        return Helper.findInServiceData(data, filters, pageRequest);
    }


    findByFilters(filters: Map<string, string>, pageRequest: PageRequest): Page<SparqlResults> {

        const data: SparqlResults = JSON.parse(JSON.stringify(this.DUMMY_DATA));

        return Helper.findInServiceData(data, filters, pageRequest);
    }


}
