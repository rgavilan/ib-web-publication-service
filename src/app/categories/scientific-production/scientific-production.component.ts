import { Component, OnInit } from '@angular/core';

/**
 *
 *
 * @export
 * @class ScientificProductionComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-scientific-production',
  templateUrl: './scientific-production.component.html'
})
export class ScientificProductionComponent implements OnInit {
  /**
   *
   *
   * @type {boolean}
   * @memberof ScientificProductionComponent
   */
  normalTree: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
