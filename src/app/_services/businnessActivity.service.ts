import { Injectable } from '@angular/core';
import { AbstractService } from '../_helpers/abstract';
import { Page, PageRequest } from '../_helpers/search';
import { Helper } from '../_helpers/utils';
import { SparqlResults } from '../_models/sparql';

/**
 *
 *
 * @export
 * @class BusinnessActivityService
 * @extends {AbstractService}
 */
@Injectable({
    providedIn: 'root',
})
export class BusinnessActivityService extends AbstractService {
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
    // mock data
    readonly DUMMY_DATA1: SparqlResults = {
        head: {
            vars: [
                'comunidad',
                'proyectos',
                'citas',
            ]
        },
        results: {
            bindings: [
                // 1
                {
                    comunidad: {
                        type: 'literal',
                        value: 'Asturias'
                    },
                    proyectos: {
                        type: 'literal',
                        value: '114'
                    },
                    citas: {
                        type: 'literal',
                        value: '450'
                    }
                },
                {
                    comunidad: {
                        type: 'literal',
                        value: 'Murcia'
                    },
                    proyectos: {
                        type: 'literal',
                        value: '14'
                    },
                    citas: {
                        type: 'literal',
                        value: '50'
                    }
                },
                {
                    comunidad: {
                        type: 'literal',
                        value: 'Madrid'
                    },
                    proyectos: {
                        type: 'literal',
                        value: '20'
                    },
                    citas: {
                        type: 'literal',
                        value: '234'
                    }
                }
            ]
        }
    };
    // mock data
    readonly DUMMY_DATA2: SparqlResults = {
        head: {
            vars: [
                'centros',
                'proyectos',
                'citas',
            ]
        },
        results: {
            bindings: [
                // 1
                {
                    centros: {
                        type: 'literal',
                        value: 'Insituto de productos Lacteos de Asturias'
                    },
                    proyectos: {
                        type: 'literal',
                        value: '114'
                    },
                    citas: {
                        type: 'literal',
                        value: '450'
                    }
                },
                {
                    centros: {
                        type: 'literal',
                        value: 'Centro de investigación'
                    },
                    proyectos: {
                        type: 'literal',
                        value: '54'
                    },
                    citas: {
                        type: 'literal',
                        value: '342'
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

    /**
     *
     *
     * @param {Map<string, string>} filters
     * @param {PageRequest} pageRequest
     * @return {*}  {Page<SparqlResults>}
     * @memberof BusinnessActivityService
     */
    findComunidad(filters: Map<string, string>, pageRequest: PageRequest): Page<SparqlResults> {
        const data: SparqlResults = JSON.parse(JSON.stringify(this.DUMMY_DATA1));
        return Helper.findInServiceData(data, filters, pageRequest);
    }

    /**
     *
     *
     * @param {Map<string, string>} filters
     * @param {PageRequest} pageRequest
     * @return {*}  {Page<SparqlResults>}
     * @memberof BusinnessActivityService
     */
    findCentros(filters: Map<string, string>, pageRequest: PageRequest): Page<SparqlResults> {
        const data: SparqlResults = JSON.parse(JSON.stringify(this.DUMMY_DATA2));
        return Helper.findInServiceData(data, filters, pageRequest);
    }

}
