import { Component, Input, OnInit } from '@angular/core';
import { FindRequest, Page, PageRequest } from 'src/app/_helpers/search';
import { SparqlResults } from 'src/app/_models/sparql';
import { ScientificProductionService } from 'src/app/_services/scientificProduction.service';
import { Helper } from 'src/app/_helpers/utils';

/**
 *
 *
 * @export
 * @class ScientificProductionComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-scientific-production',
  templateUrl: './scientific-production.component.html',
  styleUrls: ['./scientific-production.component.css']
})

export class ScientificProductionComponent implements OnInit {
  @Input() universityId: string;
  allScientificProductionFiltered: Page<SparqlResults>;

  filters: Map<string, string> = new Map();

  findRequest: FindRequest = new FindRequest();
  /**
   * Creates an instance of ScientificProductionComponent.
   * @param {ScientificProductionService} scientificProductionService
   * @memberof ScientificProductionComponent
   */
  constructor(
    private scientificProductionService: ScientificProductionService) {
  }

  ngOnInit(): void {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = 1;
    pageRequest.size = 10;

    this.allScientificProductionFiltered = this.scientificProductionService.findScientificProductionByFilters(
      null, pageRequest
    );
  }

  /**
   *
   *
   * @param {number} i
   * @memberof ScientificProductionComponent
   */
  allScientificProductionFilteredPageChanged(i: number): void {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = i;
    pageRequest.size = this.allScientificProductionFiltered.size;
    pageRequest.property = this.allScientificProductionFiltered.sort;
    pageRequest.direction = this.allScientificProductionFiltered.direction;
    this.allScientificProductionFiltered = this.scientificProductionService.findScientificProductionByFilters(
      this.filters, pageRequest
    );
  }


  /**
   *
   *
   * @param {*} event
   * @param {string} filterName
   * @memberof ScientificProductionComponent
   */
  filterResearchmentStructures(event, filterName: string) {
    const currentSelectedDate = Helper.fromModel(event);
    switch (filterName) {
      case 'releaseYear':
        this.findRequest.filter.releaseYear !== 'undefined'
          ? this.filters.set(filterName, String(currentSelectedDate.year))
          : this.filters.set(filterName, '');

        break;

      default:
        break;
    }

    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = 1;
    pageRequest.size = this.allScientificProductionFiltered.size;
    pageRequest.property = this.allScientificProductionFiltered.sort;
    pageRequest.direction = this.allScientificProductionFiltered.direction;
    // Call service to load data filtered
    this.allScientificProductionFiltered = this.scientificProductionService.findScientificProductionByFilters(
      this.filters, pageRequest
    );

  }

}
