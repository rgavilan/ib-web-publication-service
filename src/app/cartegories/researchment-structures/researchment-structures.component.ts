import { Component } from '@angular/core';
import {
  PaginatedSearchComponent,
  FindRequest,
  Page,
  Order,
  Direction,
} from '../../_helpers/search';
import { ResearchmentStructure } from '../../_models/researchmentStructure';
import { ResearchmentStructuresService } from '../../_services/researchment.structures.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

/**
 * Rearchment Structure component
 */
@Component({
  selector: 'app-researchment-structures',
  templateUrl: './researchment-structures.component.html',
  styleUrls: ['./researchment-structures.component.css'],
})
export class ResearchmentStructuresComponent extends PaginatedSearchComponent<
  ResearchmentStructure
> {
  protected removeInternal(
    entity: ResearchmentStructure
  ): Observable<{} | Response> {
    throw new Error('Method not implemented.');
  }
  constructor(
    router: Router,
    translate: TranslateService,
    toastr: ToastrService,
    private researchmentStructureService: ResearchmentStructuresService
  ) {
    super(router, translate, toastr);
  }

  protected findInternal(
    findRequest: FindRequest
  ): Observable<Page<ResearchmentStructure>> {
    return this.researchmentStructureService.findUsers(findRequest);
  }

  protected getDefaultOrder(): Order {
    return {
      property: 'name',
      direction: Direction.ASC,
    };
  }
}
