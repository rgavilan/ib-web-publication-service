import { Component, Input, OnInit } from '@angular/core';
import { FindRequest, Page, PageRequest } from 'src/app/_helpers/search';
import { Helper } from 'src/app/_helpers/utils';
import { SparqlResults } from 'src/app/_models/sparql';
import { TableResultsHeaderItem } from 'src/app/_models/table-results';
import { ParticipantService } from 'src/app/_services/participant.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html'
})
export class BusinessComponent implements OnInit {
  /**
   *
   *
   * @type {FindRequest}
   * @memberof BusinessComponent
   */
  findRequest: FindRequest = new FindRequest();
  /**
   *
   *
   * @memberof BusinessComponent
   */
  loaded = false;
  /**
   *
   *
   * @type {string}
   * @memberof BusinessComponent
   */
  @Input() universityId: string;
  /**
   *
   *
   * @type {Page<SparqlResults>}
   * @memberof BusinessComponent
   */
  allData: Page<SparqlResults> = new Page();
  /**
   *
   *
   * @memberof BusinessComponent
   */
  yearsForSelect = Helper.getYears();

  /**
   *
   *
   * @type {TableResultsHeaderItem[]}
   * @memberof BusinessComponent
   */
  headerData: TableResultsHeaderItem[] = [
    {
      textToTranslate: 'deliverable.table-header.title',
      columnName: 'title'
    },
    {
      textToTranslate: 'deliverable.table-header.type',
      columnName: 'type'
    },
    {
      textToTranslate: 'deliverable.table-header.doi',
      columnName: 'doi'
    },
    {
      textToTranslate: 'deliverable.table-header.release-year',
      columnName: 'releaseYear'
    }
  ];
  /**
   * Creates an instance of BusinessComponent.
   * @param {ParticipantService} participantService
   * @memberof BusinessComponent
   */
  constructor(private participantService: ParticipantService) {
  }


  /**
   *
   *
   * @memberof BusinessComponent
   */
  ngOnInit(): void {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = 1;
    pageRequest.size = 10;
    this.allData = this.participantService.find(
      null, pageRequest
    );
    setTimeout(() => {
      this.loaded = true;
    }, 300);

  }

  /**
   *
   *
   * @param {number} i
   * @memberof ScientificProductionComponent
   */
  allfilter(i: number): void {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = i;
    pageRequest.size = this.allData.size;
    pageRequest.property = this.allData.sort;
    pageRequest.direction = this.allData.direction;
    this.loaded = true;
  }

  /**
   *
   *
   * @param {number} i
   * @memberof BusinessComponent
   */
  allprojectsFilteredPageChanged(i: number): void {
    this.loaded = true;
  }

  /**
   *
   *
   * @param {number} i
   * @memberof BusinessComponent
   */
  allprojectsFilteredSizeChanged(i: number): void {
    this.loaded = true;
  }

  /**
   *
   *
   * @param {PageRequest} pageRequest
   * @memberof BusinessComponent
   */
  allprojectsFilteredSortChanged(pageRequest: PageRequest) {
    this.loaded = true;
  }


}
