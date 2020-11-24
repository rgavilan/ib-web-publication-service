import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
/**
 *
 *
 * @export
 * @class ResearchmentStructuresDetailComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-researchment-structures-detail',
  templateUrl: './researchment-structures-detail.component.html',
  styleUrls: ['./researchment-structures-detail.component.css']
})
export class ResearchmentStructuresDetailComponent implements OnInit {
  @ViewChild('resultsTab', { static: false })
  resultsTab: TabsetComponent;
  /**
   * researchment structure Id
   */
  researchmentId: string;
  /** 
   * researchment
   */
  researchment: any;
  /**
   * Creates an instance of ResearchmentStructuresDetailComponent.
   * @param {ActivatedRoute} route
   * @param {ResearchmentStructuresService} researchmentStructureService
   * @memberof ResearchmentStructuresDetailComponent
   */
  constructor(
    private route: ActivatedRoute) { }

  /**
   *
   *
   * @memberof ResearchmentStructuresDetailComponent
   */
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.researchmentId = params.id; // (+) converts string 'id' to a number
      if (this.researchmentId) {

      }
    });
  }

}
