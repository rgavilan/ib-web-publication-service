import { Injectable } from '@angular/core';
import { AbstractService } from 'src/app/_helpers/abstract';
import { Page, PageRequest } from 'src/app/_helpers/search';
import { Helper } from 'src/app/_helpers/utils';
import { SparqlResults } from 'src/app/_models/sparql';




/**
 *
 *  testing
 * @export
 * @class BusinnessActivityService
 * @extends {AbstractService}
 */
@Injectable({
    providedIn: 'root',
})
export class MockBusinnessActivityService extends AbstractService {
    // mock data
    readonly DUMMY_DATA: SparqlResults = {
        head: {
            vars: [
                'title',
                'type',
                'rol',
            ]
        },
        results: {
            bindings: [
                // 1
                {
                    title: {
                        type: 'literal',
                        value: 'Izertis'
                    },
                    type: {
                        type: 'literal',
                        value: 'Startup'
                    },
                    rol: {
                        type: 'literal',
                        value: 'Socio'
                    }
                },
                {
                    title: {
                        type: 'literal',
                        value: 'DXI'
                    },
                    type: {
                        type: 'literal',
                        value: 'Startup'
                    },
                    rol: {
                        type: 'literal',
                        value: 'Fundador'
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
     * @memberof BusinnessActivityService
     */
    find(filters: Map<string, string>, pageRequest: PageRequest): Page<SparqlResults> {
        const data: SparqlResults = JSON.parse(JSON.stringify(this.DUMMY_DATA));
        return Helper.findInServiceData(data, filters, pageRequest);
    }

}
