import { Injectable } from '@angular/core';
import { Direction, Page, PageRequest } from '../_helpers/search';
import { Binding, SparqlResults } from '../_models/sparql';
import { ProjectService } from './project.service';


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
