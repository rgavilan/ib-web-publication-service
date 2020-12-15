import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractService } from '../_helpers/abstract';
import { Direction, Page, PageRequest } from '../_helpers/search';
import { Helper } from '../_helpers/utils';
import { Binding, SparqlResults } from '../_models/sparql';

/**
 *  Service for scientist production
 *
 * @export
 * @extends {AbstractService}
 */
@Injectable({
    providedIn: 'root',
})
export class ScientistService extends AbstractService {
    // mock data
    readonly DUMMY_DATA_TOP: SparqlResults = {
        head: {
            vars: [
                'name',
                'area',
                'type',
                'appointments',
                'hIndex',
                'publications'
            ]
        },
        results: {
            bindings: [
                // 1
                {
                    name: {
                        type: 'literal',
                        value: 'Maria Hernandez Reyes Mora'
                    },
                    area: {
                        type: 'literal',
                        value: 'Área de gestión'
                    },
                    type: {
                        type: 'literal',
                        value: 'Docente'
                    },
                    appointments: {
                        type: 'literal',
                        value: '85'
                    },
                    hIndex: {
                        type: 'literal',
                        value: '0'
                    },
                    publications: {
                        type: 'literal',
                        value: '8'
                    }
                },
                // 1
                {
                    name: {
                        type: 'literal',
                        value: 'Jesualdo Tomás Fernández Breis'
                    },
                    area: {
                        type: 'literal',
                        value: 'Área de informática'
                    },
                    type: {
                        type: 'literal',
                        value: 'Docente'
                    },
                    appointments: {
                        type: 'literal',
                        value: '74'
                    },
                    hIndex: {
                        type: 'literal',
                        value: '1'
                    },
                    publications: {
                        type: 'literal',
                        value: '14'
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
    findTopByFilters(filters: Map<string, string>, pageRequest: PageRequest): Page<SparqlResults> {
        const data: SparqlResults = JSON.parse(JSON.stringify(this.DUMMY_DATA_TOP));
        return Helper.findInServiceData(data, filters, pageRequest);
    }


    /**
     *
     *
     * @param {Map<string, string>} filters
     * @param {PageRequest} pageRequest
     * @return {*}  {Page<SparqlResults>}
     * @memberof ProjectService
     */
    findResearchStuffByFilters(filters: Map<string, string>, pageRequest: PageRequest): Page<SparqlResults> {
        const data: SparqlResults = JSON.parse(JSON.stringify(this.DUMMY_DATA_TOP));
        return Helper.findInServiceData(data, filters, pageRequest);
    }




}
