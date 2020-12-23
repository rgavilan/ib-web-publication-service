import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scientist-detail',
  templateUrl: './scientist-detail.component.html'
})
export class ScientistDetailComponent implements OnInit {
  scientist: any = {
    name: 'María Hernandez Reyes Mora',
    email: 'reyes@um.es',
    university: 'Universidad de Murcia'
  };
  constructor() { }

  ngOnInit(): void {
  }

}
