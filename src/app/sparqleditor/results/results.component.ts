import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  inputs: ['data']
})
export class ResultsComponent implements OnInit {

  data = null;

  constructor() { }

  ngOnInit(): void {
    console.log(this.data);
  }

}
