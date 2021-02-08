import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-investigation-actions',
  templateUrl: './investigation-actions.component.html'
})
export class InvestigationActionsComponent implements OnInit {
  activeTab: string;
  constructor() { }

  ngOnInit(): void {
    this.activeTab = 'patents';
  }
  /**
   *
   *
   * @param {string} tabName
   * @memberof InvestigationActionsComponent
   */
  changeTab(tabName: string) {
    this.activeTab = tabName;
  }

}
