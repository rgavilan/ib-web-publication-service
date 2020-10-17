import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  inputs: ['data', 'errorMessage']
})
export class ResultsComponent implements OnInit {

  @ViewChild('resultsTab', { static: false })
  resultsTab: TabsetComponent;

  data: any = null;
  errorMessage = null;

  constructor() { }

  ngOnInit(): void {
    // console.log("into results component");
  }

  ngOnChanges(changes: any) {

    // this.doSomething(changes.categoryId.currentValue);
    if (!!this.resultsTab) {
      if (!!this.errorMessage) {
        this.resultsTab.tabs[0].active = true;
        this.resultsTab.tabs.forEach(tab => {
          tab.disabled = true;
        });
      } else {
        this.resultsTab.tabs[0].disabled = false;
        this.resultsTab.tabs[1].disabled = false;
      }
    }

  }


}
