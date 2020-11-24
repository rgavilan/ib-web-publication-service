import { Injectable } from '@angular/core';
import { Direction, Page, PageRequest } from 'src/app/_helpers/search';
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
export class MockPatentService extends PatentService {
    // mock data
    readonly DUMMY_DATA: SparqlResults = {
        head: {
            vars: [
                'name',
                'area',
                'organisation',
                'id'
            ]
        },
        results: {
            bindings: [
                // 1
                {
                    name: {
                        type: 'literal',
                        value: 'Patente 1'
                    },
                    area: {
                        type: 'literal',
                        value: 'Derecho'
                    },
                    organisation: {
                        type: 'literal',
                        value: 'red.es'
                    },
                    id: {
                        type: 'literal',
                        value: 'xxxxxx'
                    }
                },
                // 2
                {
                    name: {
                        type: 'literal',
                        value: 'Patente 2'
                    },
                    area: {
                        type: 'literal',
                        value: 'Historia'
                    },
                    organisation: {
                        type: 'literal',
                        value: 'Fondos europeos'
                    },
                    id: {
                        type: 'literal',
                        value: 'xxxxxx'
                    }
                }

            ]
        }
    };

    findProjectByFilters(filters: Map<string, string>, pageRequest: PageRequest): Page<SparqlResults> {
        const data: SparqlResults = JSON.parse(JSON.stringify(this.DUMMY_DATA));
        return this.findScientifiProductionByFiltersCommon(data, filters, pageRequest);
    }

    findScientifiProductionByFiltersCommon(data: SparqlResults, filters: Map<string, string>, pageRequest: PageRequest
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
