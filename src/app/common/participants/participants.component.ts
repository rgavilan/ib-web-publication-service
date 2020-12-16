import { Component, Input, OnInit } from '@angular/core';
import { FindRequest, Page, PageRequest } from 'src/app/_helpers/search';
import { SparqlResults } from 'src/app/_models/sparql';
import { ParticipantService } from 'src/app/_services/participant.service';
import { ScientistService } from 'src/app/_services/scientist.service';

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
  allDataPerson: Page<SparqlResults> = new Page();
  findRequest: FindRequest = new FindRequest();
  loaded = false;

  constructor(
    private participantService: ParticipantService,
    private scientificsService: ScientistService) {
  }


  ngOnInit(): void {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = 1;
    pageRequest.size = 10;
    this.allDataPerson = this.scientificsService.findTopByFilters(
      null, pageRequest
    );

    const findRequest: FindRequest = new FindRequest();
    this.participantService.findPerson(findRequest).subscribe(data => {
      this.allDataParticipants = data;
      this.loaded = true;
    });

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
    this.findRequest.pageRequest.page = i - 1;
    this.findRequest.pageRequest.size = this.allDataParticipants.size;
    this.participantService.findPerson(this.findRequest).subscribe((data) => {
      this.allDataParticipants = data;
      this.loaded = true;
    });
  }

  allParticipantsFilteredSizeChanged(i: number): void {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = this.allDataParticipants.number;
    pageRequest.size = i;
    pageRequest.direction = this.allDataParticipants.direction;
    this.findRequest.pageRequest = pageRequest;
    this.participantService.findPerson(this.findRequest).subscribe((data) => {
      this.allDataParticipants = data;
      this.loaded = true;
    });
  }

  allParticipantsFilteredSortChanged(pageRequest: PageRequest) {
    const newPageRequest: PageRequest = new PageRequest();
    newPageRequest.page = this.allDataParticipants.number;
    newPageRequest.size = this.allDataParticipants.size;
    newPageRequest.property = pageRequest.property;
    newPageRequest.direction = pageRequest.direction;
    this.findRequest.pageRequest = pageRequest;
    this.participantService.findPerson(this.findRequest).subscribe((data) => {
      this.allDataParticipants = data;
      this.loaded = true;
    });
  }

  allChanged(event) { }


}
