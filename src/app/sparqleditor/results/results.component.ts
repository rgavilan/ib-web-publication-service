import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  inputs: ['data', 'errorMessage']
})
export class ResultsComponent implements OnInit {

  data: any = null;
  errorMessage = null;

  constructor() { }

  ngOnInit(): void {
    console.log("into results component");
  }


}
