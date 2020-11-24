import { Component, Input, OnInit } from '@angular/core';
import { FindRequest, Page, PageRequest } from 'src/app/_helpers/search';
import { SparqlResults } from 'src/app/_models/sparql';
import { ScientistService } from 'src/app/_services/scientist.service';

/**
 *
 *
 * @export
 * @class TopSearchComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-top-search',
  templateUrl: './top-search.component.html',
  styleUrls: ['./top-search.component.css']
})
export class TopSearchComponent implements OnInit {
  @Input() universityId: string;
  allTopFiltered: Page<SparqlResults>;
  filters: Map<string, string> = new Map();
  findRequest: FindRequest = new FindRequest();
  /**
   * Creates an instance of TopSearchComponent.
   * @param {ScientistService} scientificService
   * @memberof TopSearchComponent
   */
  constructor(
    private scientificService: ScientistService) {

  }

  /**
   *
   *
   * @memberof TopSearchComponent
   */
  ngOnInit(): void {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = 1;
    pageRequest.size = 10;
    this.allTopFiltered = this.scientificService.findTopByFilters(
      null, pageRequest
    );
  }

  /**
   *
   *
   * @param {number} i
   * @memberof ScientificProductionComponent
   */
  allTopsFilteredPageChanged(i: number): void {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = i;
    pageRequest.size = this.allTopFiltered.size;
    pageRequest.property = this.allTopFiltered.sort;
    pageRequest.direction = this.allTopFiltered.direction;
    this.allTopFiltered = this.scientificService.findTopByFilters(
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
  filterTop(event, filterName: string) {
    event !== 'undefined' ? this.filters.set(filterName, event) : this.filters.set(filterName, '');
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = 1;
    pageRequest.size = this.allTopFiltered.size;
    pageRequest.property = this.allTopFiltered.sort;
    pageRequest.direction = this.allTopFiltered.direction;
    // Call service to load data filtered
    this.allTopFiltered = this.scientificService.findTopByFilters(
      this.filters, pageRequest
    );
  }
}
