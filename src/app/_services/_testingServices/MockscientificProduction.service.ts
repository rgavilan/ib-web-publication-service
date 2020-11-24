import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Direction, Page, PageRequest } from 'src/app/_helpers/search';
import { Binding, SparqlResults } from 'src/app/_models/sparql';

/**
 *  Service for scientific production
 *
 * @export
 * @extends {AbstractService}
 */
@Injectable({
    providedIn: 'root',
})
export class MockScientificProductionService extends MockScientificProductionService {
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


    findScientificProductionByFilters(filters: Map<string, string>, pageRequest: PageRequest): Page<SparqlResults> {
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
