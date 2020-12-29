import { Component, Input, OnInit } from '@angular/core';
import { HelperGraphics } from 'src/app/_helpers/helperGraphics';
import { FindRequest, Page, PageRequest } from 'src/app/_helpers/search';
import { Helper } from 'src/app/_helpers/utils';
import { SparqlResults } from 'src/app/_models/sparql';
import { ScientistService } from 'src/app/_services/scientist.service';
/**
 *
 *
 * @export
 * @class ScientistSearchComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-scientist-search',
  templateUrl: './scientist-search.component.html'
})
export class ScientistSearchComponent implements OnInit {
  /**
   * university Id for search filter in case of necessary
   */
  @Input() universityId: string;
  allScientificsFiltered: Page<SparqlResults>;
  filters: Map<string, string> = new Map();
  findRequest: FindRequest = new FindRequest();
  echartOptions: any;
  normalTree = true;

  loaded = false;

  /**
   * Constructor
   * param router 
   * param translate 
   * param toastr 
   * param researchmentStructureService 
   * param cdr 
   */
  constructor(
    private scientificsService: ScientistService) {
  }

  /**
   *
   *
   * @memberof ScientistSearchComponent
   */
  ngOnInit(): void {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = 1;
    pageRequest.size = 10;

    this.allScientificsFiltered = this.scientificsService.findTopByFilters(
      null, pageRequest
    );


    let xAxisData: Array<string> = [];
    let data1: Array<any> = [];
    let data2: Array<any> = [];

    for (let i = 0; i < 100; i++) {
      xAxisData.push('category' + i);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

    const data = Helper.genData(7);
    this.echartOptions = HelperGraphics.configChartPie(data, 'Sello de Calidad', 'Personal por tipo filtrado por area');
  }

  /**
   *
   *
   * @param {number} i
   * @memberof ScientificProductionComponent
   */
  allScientistsFilteredPageChanged(i: number): void {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = i;
    pageRequest.size = this.allScientificsFiltered.size;
    pageRequest.property = this.allScientificsFiltered.sort;
    pageRequest.direction = this.allScientificsFiltered.direction;
    this.allScientificsFiltered = this.scientificsService.findTopByFilters(
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
    pageRequest.size = this.allScientificsFiltered.size;
    pageRequest.property = this.allScientificsFiltered.sort;
    pageRequest.direction = this.allScientificsFiltered.direction;
    // Call service to load data filtered
    this.allScientificsFiltered = this.scientificsService.findTopByFilters(
      this.filters, pageRequest
    );
  }

}
