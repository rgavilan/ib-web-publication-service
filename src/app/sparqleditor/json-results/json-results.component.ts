import { Component, OnInit, Input, AfterViewChecked, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-json-results',
  templateUrl: './json-results.component.html'
})
export class JsonResultsComponent implements OnInit, AfterViewChecked {
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

  ngAfterViewChecked() {
    /* Looks for changes on this component and its children, after the wizardSteps changed */
    this.cd.detectChanges();
  }

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  }
}
