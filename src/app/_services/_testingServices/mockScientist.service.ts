import { Injectable } from '@angular/core';
import { Direction, Page, PageRequest } from 'src/app/_helpers/search';
import { Binding, SparqlResults } from 'src/app/_models/sparql';
import { ScientistService } from '../scientist.service';
/**
 *  Testing Service for scientist
 *
 * @export
 * @extends {AbstractService}
 */
@Injectable({
    providedIn: 'root',
})
export class MockScientistService extends ScientistService {
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

    findTopByFilters(filters: Map<string, string>, pageRequest: PageRequest): Page<SparqlResults> {
        const data: SparqlResults = JSON.parse(JSON.stringify(this.DUMMY_DATA_TOP));
        return this.findByFiltersCommon(data, filters, pageRequest);
    }


    findResearchStuffByFilters(filters: Map<string, string>, pageRequest: PageRequest): Page<SparqlResults> {
        const data: SparqlResults = JSON.parse(JSON.stringify(this.DUMMY_DATA_TOP));
        return this.findByFiltersCommon(data, filters, pageRequest);
    }


    findByFiltersCommon(data: SparqlResults, filters: Map<string, string>, pageRequest: PageRequest
    ): Page<SparqlResults> {
        const page: Page<SparqlResults> = new Page<SparqlResults>();

        let dataFiltered: Binding[] = data.results.bindings;

        // Filters
        if (!!filters) {
            filters.forEach((valueFilter: string, keyFilter: string) => {
                if (!!valueFilter) {
                    dataFiltered = data.results.bindings = data.results.bindings.filter((binding: Binding) => {
                        for (const keyObject of Object.keys(binding)) {
                            if (
                                keyObject === keyFilter &&
                                binding[keyObject].value === valueFilter
                            ) {
                                return true;
                            }
                        }
                    });
                }
            });
        }

        // Order
        if (!!pageRequest && !!pageRequest.property) {
            page.sort = pageRequest.property;
            page.direction = pageRequest.direction;
            data.results.bindings = data.results.bindings.sort((a, b) => {
                if (pageRequest.direction === Direction.ASC) {
                    return (a[pageRequest.property].value > b[pageRequest.property].value) ? 1 : -1;
                }
                return (a[pageRequest.property].value <= b[pageRequest.property].value) ? 1 : -1;
            });
        }

        const min = ((!!pageRequest.page) ? pageRequest.page - 1 : 0) * pageRequest.size;
        const max = ((!!pageRequest.page) ? pageRequest.page : 1) * pageRequest.size;
        data.results.bindings = data.results.bindings.slice(min, max);
        page.number = pageRequest.page;
        page.numberOfElements = pageRequest.size;
        page.size = pageRequest.size;
        page.totalElements = dataFiltered.length;
        // TODO sort

        page.content = [data];

        return page;
    }


}
