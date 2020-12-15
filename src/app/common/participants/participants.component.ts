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
  allDataParticipants: Page<SparqlResults> = new Page();
  findRequest: FindRequest = new FindRequest();
  loaded = false;

  constructor(private participantService: ParticipantService) {
  }


  ngOnInit(): void {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = 1;
    pageRequest.size = 10;
    this.allDataParticipants = this.participantService.find(
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
  allScientistsFilteredPageChanged(i: number): void {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = i;
    pageRequest.size = this.allDataParticipants.size;
    pageRequest.property = this.allDataParticipants.sort;
    pageRequest.direction = this.allDataParticipants.direction;
    this.loaded = true;
  }

  allParticipantsFilteredPageChanged(i: number): void {
    this.loaded = true;
  }

  allParticipantsFilteredSizeChanged(i: number): void {
    this.loaded = true;
  }

  allParticipantsFilteredSortChanged(pageRequest: PageRequest) {
    this.loaded = true;
  }


}
