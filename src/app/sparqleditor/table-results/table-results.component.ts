import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-results',
  templateUrl: './table-results.component.html',
  styleUrls: ['./table-results.component.css'],
  inputs: ['data']
})
export class TableResultsComponent implements OnInit {

  data = null;

  constructor() { }

  ngOnInit(): void {
    console.log(this.data);
  }

}
