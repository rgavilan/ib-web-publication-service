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
                'id',
                'anyo',
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
                    id: {
                        type: 'literal',
                        value: '123'
                    },
                    anyo: {
                        type: 'literal',
                        value: '2020'
                    }
                },
                // 1
                {
                    name: {
                        type: 'literal',
                        value: 'Jesualdo Tomás Fernández Breis'
                    },
                    id: {
                        type: 'literal',
                        value: '345'
                    },
                    anyo: {
                        type: 'literal',
                        value: '2019'
                    }
                },
                // 1
                {
                    name: {
                        type: 'literal',
                        value: 'Jesualdo Tomás Fernández Breis'
                    },
                    id: {
                        type: 'literal',
                        value: '567'
                    },
                    anyo: {
                        type: 'literal',
                        value: '2018'
                    }
                },
                // 1
                {
                    name: {
                        type: 'literal',
                        value: 'Jesualdo Tomás Fernández Breis'
                    },
                    id: {
                        type: 'literal',
                        value: '233232'
                    },
                    anyo: {
                        type: 'literal',
                        value: '2819'
                    }
                },
                // 1
                {
                    name: {
                        type: 'literal',
                        value: 'Jesualdo Tomás Fernández Breis'
                    },
                    id: {
                        type: 'literal',
                        value: '333'
                    },
                    anyo: {
                        type: 'literal',
                        value: '1990'
                    }
                },
                // 1
                {
                    name: {
                        type: 'literal',
                        value: 'Jesualdo Tomás Fernández Breis'
                    },
                    id: {
                        type: 'literal',
                        value: '786'
                    },
                    anyo: {
                        type: 'literal',
                        value: '2017'
                    }
                },
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
