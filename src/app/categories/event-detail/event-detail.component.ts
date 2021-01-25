import { Component, OnInit } from '@angular/core';
import { EventDetail } from 'src/app/_models/eventDetail';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html'
})
export class EventDetailComponent implements OnInit {
  event: EventDetail = {
    title: 'IV congreso sobre semántica web de España',
    type: 'Congreso',
    id: '123',
    area: 'Web semántica',
    location: 'Universidad de Murcia',
    dateFrom: '09-01-2014 9:00',
    deteTo: '09-01-2014 14:00',
    participant: 'Izertis',
    keyword: 'Semántica',
    asociatedPublication: 'Extracción semántica',
    description: 'És un fet establert de forma evident que un lector es distraurà amb el contingut llegible duna pàgina quan miri a la seva composició. El fet de fer servir Lorem Ipsum és perquè conté una distribució més o menys normal de lletres, de forma oposada a quan es fa servir "Contingut aquí, contingut aquí", aconseguint així que sembli català llegible. Molts paquets dautoedició fan servir Lorem Ipsum com el seu model de text, i una cerca per "Lorem Ipsum" descobrirà molts llocs web encara a les baceroles. Diverses versions han anat evolucionant al llarg dels anys, a vegades per acident, a vegades a propòsit (inserint humor i coses per lestil).'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
