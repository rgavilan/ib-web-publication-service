import { Component, OnInit } from '@angular/core';
import { FindRequest } from 'src/app/_helpers/search';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html'
})
export class EventsComponent implements OnInit {
  findRequest: FindRequest = new FindRequest();
  dateIni;
  dateFin;
  constructor() { }

  ngOnInit(): void {
  }

  filterEvents() {

  }

}
