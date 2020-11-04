import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-results',
  templateUrl: './table-results.component.html',
  styleUrls: ['./table-results.component.css'],
})
export class TableResultsComponent implements OnInit {
  _data; // private property _data
  _dataToShow;

  // use getter setter to define the property
  get data(): any {
    return this._data;
  }

  @Input()
  set data(val: any) {
    this._data = val;
    if (val != null) {
      this.numPages =
        Math.trunc(val.results.bindings.length / this.pageSize) + 1;
      this.showPage(1);
    }
  }

  pageSize = 10;
  numPages = 1;
  actualPage = 1;

  constructor() {}

  ngOnInit(): void {
    console.log(this.data);
  }

  showPage(i: number): void {
    this.actualPage = i;
    var init = (i - 1) * 10;
    var end = i * 10;
    this._dataToShow = this._data.results.bindings.slice(init, end);
  }
}
