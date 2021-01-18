import { Component, OnInit } from '@angular/core';
import { FindRequest, Page, PageRequest } from 'src/app/_helpers/search';
import { SparqlResults } from 'src/app/_models/sparql';
import { EventsService } from 'src/app/_services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html'
})
export class EventsComponent implements OnInit {
  findRequest: FindRequest = new FindRequest();
  dateIni;
  dateFin;
  allEvents: Page<SparqlResults> = new Page();
  loaded: boolean;
  filters: Map<string, string> = new Map();
  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = 1;
    pageRequest.size = 10;
    this.allEvents = this.eventsService.find(
      null, pageRequest
    );
    this.loaded = true;
  }

  filterEvents() {

  }

  /**
   *
   *
   * @param {number} i
   * @memberof EventsComponent
   */
  allEventsFilteredPageChanged(i: number) {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = i;
    pageRequest.size = this.allEvents.size;
    pageRequest.property = this.allEvents.sort;
    pageRequest.direction = this.allEvents.direction;
    this.allEvents = this.eventsService.findByFilters(
      this.filters, pageRequest
    );
  }


  /**
   *
   *
   * @param {number} i
   * @memberof EventsComponent
   */
  allEventsFilteredSizeChanged(i: number) {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = this.allEvents.number;
    pageRequest.size = i;
    pageRequest.property = this.allEvents.sort;
    pageRequest.direction = this.allEvents.direction;

    this.allEvents = this.eventsService.findByFilters(
      this.filters, pageRequest
    );
  }


  /**
   *
   *
   * @param {PageRequest} pageRequest
   * @memberof EventsComponent
   */
  allEventsFilteredSortChanged(pageRequest: PageRequest) {
    const newPageRequest: PageRequest = new PageRequest();
    newPageRequest.page = this.allEvents.number;
    newPageRequest.size = this.allEvents.size;
    newPageRequest.property = pageRequest.property;
    newPageRequest.direction = pageRequest.direction;

    this.allEvents = this.eventsService.findByFilters(
      this.filters, pageRequest
    );
  }

}
