import { Component, Input, OnInit } from '@angular/core';
import { FindRequest, Page, PageRequest } from 'src/app/_helpers/search';
import { SparqlResults } from 'src/app/_models/sparql';
import { ParticipantService } from 'src/app/_services/participant.service';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html'
})
export class ParticipantsComponent implements OnInit {
  /**
   * university Id for search filter in case of necessary
   */
  @Input() universityId: string;
  allData: Page<SparqlResults> = new Page();
  findRequest: FindRequest = new FindRequest();
  loaded = false;

  constructor(private participantService: ParticipantService) {
  }


  ngOnInit(): void {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = 1;
    pageRequest.size = 10;
    this.allData = this.participantService.find(
      null, pageRequest
    );
    this.loaded = true;
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
    pageRequest.size = this.allData.size;
    pageRequest.property = this.allData.sort;
    pageRequest.direction = this.allData.direction;

  }

  allprojectsFilteredPageChanged(i: number): void {

  }

  allprojectsFilteredSizeChanged(i: number): void {

  }

  allprojectsFilteredSortChanged(pageRequest: PageRequest) { }


}
