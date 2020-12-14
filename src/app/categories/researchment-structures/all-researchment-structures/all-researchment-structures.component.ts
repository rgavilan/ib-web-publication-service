import { Component, OnInit } from '@angular/core';
import { FindRequest, Page, PageRequest } from 'src/app/_helpers/search';
import { SparqlResults } from 'src/app/_models/sparql';
import { ResearchmentStructuresService } from 'src/app/_services/researchment.structures.service';

/**
 *
 *
 * @export
 * @class AllResearchmentStructuresComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-all-researchment-structures',
  templateUrl: './all-researchment-structures.component.html'
})
export class AllResearchmentStructuresComponent implements OnInit {

  allResearchmentStructuresFiltered: Page<SparqlResults>;

  filters: Map<string, string> = new Map();

  findRequest: FindRequest = new FindRequest();

  constructor(
    private researchmentStructureService: ResearchmentStructuresService
  ) {
  }

  ngOnInit(): void {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = 1;
    pageRequest.size = 10;

    this.allResearchmentStructuresFiltered = this.researchmentStructureService.findResearchmentStructuresByFilters(
      null, pageRequest
    );
  }

  /**
   * Filter researchment structures
   *
   * @param {string} filterName
   * @memberof AllResearchmentStructuresComponent
   */
  filterResearchmentStructures(filterName: string) {
    switch (filterName) {
      case 'type':
        this.findRequest.filter.type !== 'undefined'
          ? this.filters.set(filterName, this.findRequest.filter.type)
          : this.filters.set(filterName, '');

        break;

      default:
        break;
    }

    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = 1;
    pageRequest.size = this.allResearchmentStructuresFiltered.size;
    pageRequest.property = this.allResearchmentStructuresFiltered.sort;
    pageRequest.direction = this.allResearchmentStructuresFiltered.direction;

    // Call service to load data filtered
    this.allResearchmentStructuresFiltered = this.researchmentStructureService.findResearchmentStructuresByFilters(
      this.filters, pageRequest
    );

  }



  /**
   * Function called on pageChanged event of TableResultsComponent
   *
   * @param {number} i
   * @memberof AllResearchmentStructuresComponent
   */
  allResearchmentStructuresFilteredPageChanged(i: number): void {
    console.log('allResearchmentStructuresFilteredPageChanged');

    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = i;
    pageRequest.size = this.allResearchmentStructuresFiltered.size;
    pageRequest.property = this.allResearchmentStructuresFiltered.sort;
    pageRequest.direction = this.allResearchmentStructuresFiltered.direction;

    //  const map: Map<string, string> = new Map(Object.entries(this.findRequest.filter));

    this.allResearchmentStructuresFiltered = this.researchmentStructureService.findResearchmentStructuresByFilters(
      this.filters, pageRequest
    );
  }

  /**
   * Function called on sizeChanged event of TableResultsComponent
   *
   * @param {number} i
   * @memberof AllResearchmentStructuresComponent
   */
  allResearchmentStructuresFilteredSizeChanged(i: number): void {
    console.log('allResearchmentStructuresFilteredSizeChanged');

    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = this.allResearchmentStructuresFiltered.number;
    pageRequest.size = i;
    pageRequest.property = this.allResearchmentStructuresFiltered.sort;
    pageRequest.direction = this.allResearchmentStructuresFiltered.direction;

    this.allResearchmentStructuresFiltered = this.researchmentStructureService.findResearchmentStructuresByFilters(
      this.filters, pageRequest
    );
  }


  /**
   * Function called on sortChanged event of TableResultsComponent
   *
   * @param {PageRequest} pageRequest
   * @memberof AllResearchmentStructuresComponent
   */
  allResearchmentStructuresFilteredSortChanged(pageRequest: PageRequest): void {
    console.log('allResearchmentStructuresFilteredSortChanged');

    const newPageRequest: PageRequest = new PageRequest();
    newPageRequest.page = this.allResearchmentStructuresFiltered.number;
    newPageRequest.size = this.allResearchmentStructuresFiltered.size;
    newPageRequest.property = pageRequest.property;
    newPageRequest.direction = pageRequest.direction;

    this.allResearchmentStructuresFiltered = this.researchmentStructureService.findResearchmentStructuresByFilters(
      this.filters, pageRequest
    );
  }

}
