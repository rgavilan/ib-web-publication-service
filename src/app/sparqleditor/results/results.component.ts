import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  inputs: ['data', 'errorMessage']
})
export class ResultsComponent implements AfterViewInit, OnChanges {

  @ViewChild('resultsTab', { static: false })
  resultsTab: TabsetComponent;

  data: any = null;
  errorMessage = null;


  // Set default values after load the view
  ngAfterViewInit(): void {
    if (!!this.resultsTab) {
      if (!this.data) {
        this.resultsTab.tabs[0].active = true;
        this.resultsTab.tabs.forEach(tab => {
          tab.disabled = true;
        });
      }
    }
  }

  // Set values when load the view
  ngOnChanges(changes: SimpleChanges) {
    // this.doSomething(changes.categoryId.currentValue);
    if (!!this.resultsTab) {
      if (!!this.errorMessage || !this.data) {
        this.resultsTab.tabs[0].active = true;
        this.resultsTab.tabs.forEach(tab => {
          tab.disabled = true;
        });
      } else {
        // _TODO: Enable tabs depending of the data
        this.resultsTab.tabs[0].disabled = false;
        this.resultsTab.tabs[1].disabled = false;
      }
    }
  }


}
