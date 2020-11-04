import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Direction, FindRequest, Order, Page, PaginatedSearchComponent } from '../_helpers/search';
import { Proyect } from '../_models/proyect';

@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',
  styleUrls: ['./proyects.component.css']
})
export class ProyectsComponent extends PaginatedSearchComponent<Proyect> implements OnInit {

  constructor(router: Router,
    translate: TranslateService,
    toastr: ToastrService) { super(router, translate, toastr); }

  ngOnInit(): void {
  }

  protected findInternal(findRequest: FindRequest): Observable<Page<Proyect>> {
    //return this.userService.findUsers(findRequest);
    return null;
  }

  protected removeInternal(entity: Proyect): Observable<any> {
    //return this.userService.toggle(entity);
    return null;
  }

  protected getDefaultOrder(): Order {
    return {
      property: 'id',
      direction: Direction.ASC
    };
  }

}
