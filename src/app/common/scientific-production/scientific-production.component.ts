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
  allResearchmentStructuresFiltered: Page<SparqlResults>;

  filters: Map<string, string> = new Map();

  findRequest: FindRequest = new FindRequest();
  constructor(
    private scientificProductionService: ScientificProductionService) {
  }

  ngOnInit(): void {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = 1;
    pageRequest.size = 10;

    this.allResearchmentStructuresFiltered = this.scientificProductionService.findScientificProductionByFilters(
      null, pageRequest
    );

    console.log(this.allResearchmentStructuresFiltered);
    const xAxisData = [];
    const data1 = [];
    const data2 = [];

    for (let i = 0; i < 100; i++) {
      xAxisData.push('category' + i);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }
  }

  /**
   *
   *
   * @param {number} i
   * @memberof ScientificProductionComponent
   */
  allScientificProductionFilteredPageChanged(i: number): void {
    console.log('allResearchmentStructuresFilteredPageChanged');
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = i;
    pageRequest.size = this.allResearchmentStructuresFiltered.size;
    pageRequest.property = this.allResearchmentStructuresFiltered.sort;
    pageRequest.direction = this.allResearchmentStructuresFiltered.direction;
    this.allResearchmentStructuresFiltered = this.scientificProductionService.findScientificProductionByFilters(
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
    pageRequest.size = this.allResearchmentStructuresFiltered.size;
    pageRequest.property = this.allResearchmentStructuresFiltered.sort;
    pageRequest.direction = this.allResearchmentStructuresFiltered.direction;
    // Call service to load data filtered
    this.allResearchmentStructuresFiltered = this.scientificProductionService.findScientificProductionByFilters(
      this.filters, pageRequest
    );

  }



  filterArea(event) {
    console.log(event);
    this.findRequest.filter.area = event;
    /*this.filtersArea.set('area', this.findRequest.filter.area);
    const page = this.researchmentStructureService.filterArea(
      this.filtersArea
    );

    setTimeout(() => {
      this.searchResult = [...page.content];
      page.uibPage = page.number + 1;
      this.resultObject = page;
      this.cdr.detectChanges();
    }, 300);*/

  }

}
