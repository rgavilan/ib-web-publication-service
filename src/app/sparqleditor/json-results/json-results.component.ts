import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-json-results',
  templateUrl: './json-results.component.html',
  styleUrls: ['./json-results.component.css']
})
export class JsonResultsComponent implements OnInit {

  _data; // private property _data
  _dataToShow;

  // use getter setter to define the property
  get data(): any { 
    return this._data;
  }
  
  @Input()
  set data(val: any) {
    this._data = val;
  }

  constructor() { }

  ngOnInit(): void {
    console.log(this.data);
  }


}
