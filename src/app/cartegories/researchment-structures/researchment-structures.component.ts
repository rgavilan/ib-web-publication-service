import {
  Component,
  OnInit,
  ViewContainerRef,
  AfterContentInit,
} from '@angular/core';
import {
  PaginatedSearchComponent,
  FindRequest,
  Page,
  Order,
  Direction,
} from '../../_helpers/search';
import { User } from '../../_models/user';
import { ResearchmentStructuresService } from '../../_services/researchment.structures.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

/**
 * Componente para la búsqueda de usuarios.
 */
@Component({
  selector: 'app-researchment-structures',
  templateUrl: './researchment-structures.component.html',
  styleUrls: ['./researchment-structures.component.css'],
})
export class ResearchmentStructuresComponent extends PaginatedSearchComponent<
  User
> {
  constructor(
    router: Router,
    translate: TranslateService,
    toastr: ToastrService,
    private userService: ResearchmentStructuresService
  ) {
    super(router, translate, toastr);
  }

  protected findInternal(findRequest: FindRequest): Observable<Page<User>> {
    return this.userService.findUsers(findRequest);
  }

  protected removeInternal(entity: User): Observable<any> {
    return this.userService.toggle(entity);
  }

  protected getDefaultOrder(): Order {
    return {
      property: 'id',
      direction: Direction.ASC,
    };
  }
}
