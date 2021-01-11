import { Component, OnInit } from '@angular/core';
import { FindRequest, Page, PageRequest } from 'src/app/_helpers/search';
import { SparqlResults } from 'src/app/_models/sparql';
import { TableResultsHeaderItem } from 'src/app/_models/table-results';
import { BusinnessActivityService } from 'src/app/_services/businnessActivity.service';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html'
})
export class StartupComponent implements OnInit {
  /**
   *
   *
   * @type {FindRequest}
   * @memberof StartupComponent
   */
  findRequest: FindRequest = new FindRequest();
  /**
   *
   *
   * @memberof StartupComponent
   */
  loaded = false;
  /**
   *
   *
   * @type {Page<SparqlResults>}
   * @memberof StartupComponent
   */
  allStartup: Page<SparqlResults> = new Page();
  /**
   *
   *
   * @type {TableResultsHeaderItem[]}
   * @memberof StartupComponent
   */
  headerData: TableResultsHeaderItem[] = [
    {
      textToTranslate: 'startup.table-header.title',
      columnName: 'title'
    },
    {
      textToTranslate: 'startup.table-header.type',
      columnName: 'type'
    },
    {
      textToTranslate: 'startup.table-header.rol',
      columnName: 'rol'
    }
  ];
  constructor(private businnessActivityService: BusinnessActivityService) { }

  ngOnInit(): void {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = 1;
    pageRequest.size = 10;
    this.allStartup = this.businnessActivityService.find(
      null, pageRequest
    );
    this.loaded = true;
  }

  /**
   *
   *
   * @param {number} i
   * @memberof StartupComponent
   */
  allStartupFilteredPageChanged(i: number) {
    this.loaded = true;
  }
  /**
   *
   *
   * @param {number} i
   * @memberof StartupComponent
   */
  allStartupFilteredSizeChanged(i: number) {
    this.loaded = true;
  }
  /**
   *
   *
   * @param {PageRequest} pageRequest
   * @memberof StartupComponent
   */
  allStartupFilteredSortChanged(pageRequest: PageRequest) {
    this.loaded = true;
  }

  /**
   *
   *
   * @memberof StartupComponent
   */
  filterDocuments() {
    this.loaded = true;
  }
}
