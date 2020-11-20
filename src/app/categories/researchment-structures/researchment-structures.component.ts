import { Component, OnInit } from '@angular/core';
import {
  Page,
} from '../../_helpers/search';
import { ResearchmentStructuresService } from '../../_services/researchment.structures.service';
import { SparqlResults } from 'src/app/_models/sparql';

/**
 * Rearchment Structure component
 */
@Component({
  selector: 'app-researchment-structures',
  templateUrl: './researchment-structures.component.html',
  styleUrls: ['./researchment-structures.component.css'],
})
export class ResearchmentStructuresComponent
  implements OnInit {
  echartOptions: any;


  constructor(

  ) {

  }

  ngOnInit(): void {

  }


}
