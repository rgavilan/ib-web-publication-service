import { Component, OnInit } from '@angular/core';
import { FindRequest, Page, PageRequest } from 'src/app/_helpers/search';
import { SparqlResults } from 'src/app/_models/sparql';
import { ResearchmentStructuresService } from 'src/app/_services/researchment.structures.service';

@Component({
  selector: 'app-top-researchment-structures',
  templateUrl: './top-researchment-structures.component.html',
  styleUrls: ['./top-researchment-structures.component.css']
})
export class TopResearchmentStructuresComponent implements OnInit {


  topResearchmentStructuresFiltered: Page<SparqlResults>;

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

    this.topResearchmentStructuresFiltered = this.researchmentStructureService.findTopResearchmentStructuresByFilters2(
      null, pageRequest
    );
  }

  /*
  * Filter researchment structures
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
    pageRequest.size = this.topResearchmentStructuresFiltered.size;
    pageRequest.property = this.topResearchmentStructuresFiltered.sort;
    pageRequest.direction = this.topResearchmentStructuresFiltered.direction;

    // Call service to load data filtered
    this.topResearchmentStructuresFiltered = this.researchmentStructureService.findTopResearchmentStructuresByFilters2(
      this.filters, pageRequest
    );

  }

  /*
 * Filter researchment structures
 */
  filterTopResearchmentStructures(filterName: string) {
    switch (filterName) {
      case 'qa':
        // si el valor viene undefined debería "resetar el valor "
        this.findRequest.filter.qa !== 'undefined'
          ? this.filters.set(filterName, this.findRequest.filter.qa)
          : this.filters.set(filterName, '');
        break;

      default:
        break;
    }


    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = 1;
    pageRequest.size = this.topResearchmentStructuresFiltered.size;
    pageRequest.property = this.topResearchmentStructuresFiltered.sort;
    pageRequest.direction = this.topResearchmentStructuresFiltered.direction;

    // Call service to load data filtered
    this.topResearchmentStructuresFiltered = this.researchmentStructureService.findTopResearchmentStructuresByFilters2(
      this.filters, pageRequest
    );
  }


  topResearchmentStructuresFilteredPageChanged(i: number): void {
    console.log('topResearchmentStructuresFilteredPageChanged');

    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = i;
    pageRequest.size = this.topResearchmentStructuresFiltered.size;
    pageRequest.property = this.topResearchmentStructuresFiltered.sort;
    pageRequest.direction = this.topResearchmentStructuresFiltered.direction;

    //  const map: Map<string, string> = new Map(Object.entries(this.findRequest.filter));

    this.topResearchmentStructuresFiltered = this.researchmentStructureService.findTopResearchmentStructuresByFilters2(
      this.filters, pageRequest
    );
  }

  topResearchmentStructuresFilteredSizeChanged(i: number): void {
    console.log('topResearchmentStructuresFilteredSizeChanged');

    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = this.topResearchmentStructuresFiltered.number;
    pageRequest.size = i;
    pageRequest.property = this.topResearchmentStructuresFiltered.sort;
    pageRequest.direction = this.topResearchmentStructuresFiltered.direction;

    this.topResearchmentStructuresFiltered = this.researchmentStructureService.findTopResearchmentStructuresByFilters2(
      this.filters, pageRequest
    );
  }


  topResearchmentStructuresFilteredSortChanged(pageRequest: PageRequest): void {
    console.log('topResearchmentStructuresFilteredSortChanged');

    const newPageRequest: PageRequest = new PageRequest();
    newPageRequest.page = this.topResearchmentStructuresFiltered.number;
    newPageRequest.size = this.topResearchmentStructuresFiltered.size;
    newPageRequest.property = pageRequest.property;
    newPageRequest.direction = pageRequest.direction;

    this.topResearchmentStructuresFiltered = this.researchmentStructureService.findTopResearchmentStructuresByFilters2(
      this.filters, pageRequest
    );
  }

}

