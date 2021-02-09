import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  inputs: ['data', 'errorMessage'],
})
export class ResultsComponent implements AfterViewInit, OnChanges, AfterViewChecked {
  @ViewChild('resultsTab', { static: false })
  resultsTab: TabsetComponent;
  activeTab: string;

  data: any = null;
  errorMessage = null;

  constructor(private cd: ChangeDetectorRef) {

  }

  ngAfterViewChecked() {
    /* Looks for changes on this component and its children, after the wizardSteps changed */
    this.cd.detectChanges();
  }
  // Set default values after load the view
  ngAfterViewInit(): void {
    this.activeTab = 'table';
    if (!!this.resultsTab) {
      if (!this.data) {
        this.resultsTab.tabs[0].active = true;
      }
    }
  }

  // Set values when load the view
  ngOnChanges(changes: SimpleChanges) {
    // this.doSomething(changes.categoryId.currentValue);
    if (!!this.resultsTab) {
      if (!!this.errorMessage || !this.data) {
        this.resultsTab.tabs[0].active = true;
        this.resultsTab.tabs.forEach((tab) => {
          tab.disabled = true;
        });
      } else {
        // _TODO: Enable tabs depending of the data
        this.resultsTab.tabs[0].disabled = false;
        this.resultsTab.tabs[1].disabled = false;
      }
    }
  }

  changeTab(tab: string) {
    this.activeTab = tab;
  }
}
