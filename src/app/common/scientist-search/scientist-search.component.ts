import { Component, Input, OnInit } from '@angular/core';
import { HelperGraphics } from 'src/app/_helpers/helperGraphics';
import { FindRequest, Page, PageRequest } from 'src/app/_helpers/search';
import { Helper } from 'src/app/_helpers/utils';
import { Person } from 'src/app/_models/person';
import { SparqlResults } from 'src/app/_models/sparql';
import { TableResultsHeaderItem } from 'src/app/_models/table-results';
import { ResearchStaffService } from 'src/app/_services/research-staff.service';
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
  @Input() idPrefix: string;
  /**
   *
   *
   * @type {Page<SparqlResults>}
   * @memberof ScientistSearchComponent
   */
  allScientificsFiltered: Page<Person> = new Page();
  /**
   *
   *
   * @type {Map<string, string>}
   * @memberof ScientistSearchComponent
   */
  filters: Map<string, string> = new Map();
  /**
   *
   *
   * @type {FindRequest}
   * @memberof ScientistSearchComponent
   */
  findRequest: FindRequest = new FindRequest();
  /**
   *
   *
   * @type {*}
   * @memberof ScientistSearchComponent
   */
  echartOptions: any;
  /**
   *
   *
   * @memberof ScientistSearchComponent
   */
  normalTree = true;

  /**
   *
   *
   * @memberof ScientistSearchComponent
   */
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
    private researchStaffServices: ResearchStaffService) {
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
    this.researchStaffServices.find(this.findRequest).subscribe(res => {
      this.allScientificsFiltered = res;
      this.loaded = true;
    });

    const xAxisData: Array<string> = [];
    const data1: Array<any> = [];
    const data2: Array<any> = [];

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
    this.researchStaffServices.find(this.findRequest).subscribe(res => {
      this.allScientificsFiltered = res;
      this.loaded = true;
    });
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
    this.researchStaffServices.find(this.findRequest).subscribe(res => {
      this.allScientificsFiltered = res;
      this.loaded = true;
    });
  }

}
