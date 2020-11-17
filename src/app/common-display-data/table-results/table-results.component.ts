import { HttpParams } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import {
  Direction,
  FindRequest,
  Order,
  Page,
  PaginatedSearchComponent,
} from 'src/app/_helpers/search';
import { Helper } from 'src/app/_helpers/utils';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-table-results',
  templateUrl: './table-results.component.html',
  styleUrls: ['./table-results.component.css'],
})
export class TableResultsComponent
  extends PaginatedSearchComponent<any>
  implements OnInit {
  _data; // private property _data
  _dataToShow;

  // use getter setter to define the property
  @Input()
  set data(val: any) {
    this._data = val;
    if (val != null) {
      this.numPages =
        Math.trunc(val.results.bindings.length / this.pageSize) + 1;
      this.showPage(1);
    }
  }

  get data(): any {
    return this._data;
  }

  pageSize = 10;
  numPages = 1;
  actualPage = 1;

  constructor(
    router: Router,
    translate: TranslateService,
    toastr: ToastrService,
    private userService: UserService
  ) {
    super(router, translate, toastr);
  }

  ngOnInit(): void {
    console.log('ngOnInit ' + this.data);
    this.find();
    let page: Page<any> = new Page<any>();

    page.content = this._data.results;

    page.first = true;
    page.last = false;

    page.number = 1;
    page.numberOfElements = this.pageSize;
    page.size = this.pageSize;
    page.totalElements = 3;
    page.uibPage = page.number + 1;
    page.totalPages = this.numPages;
    this.findRequest.filter.top = 10;

    this.searchResult = page.content;
    this.resultObject = page;
  }

  protected findInternal(findRequest: FindRequest): Observable<Page<any>> {
    console.log('findInternal ' + this.data);
    // TODO Tiene q devolver un Page, cambiarlo como el oninit
    let page: Page<any> = new Page<any>();

    page.content = this._data.results;

    page.first = true;
    page.last = false;

    page.number = 1;
    page.numberOfElements = this.pageSize;
    page.size = this.pageSize;
    page.totalElements = 3;
    page.uibPage = page.number + 1;
    page.totalPages = this.numPages;
    // Modificar
    let parameters = new HttpParams();
    this._data.head.vars.forEach((head) => {
      parameters = Helper.addParam(parameters, head, null);
    });
    parameters = Helper.addPaginationParams(
      parameters,
      findRequest.pageRequest
    );

    return of(page);
  }
  protected removeInternal(entity: any): Observable<{} | Response> {
    throw new Error('Method not implemented.');
  }

  protected getDefaultOrder(): Order {
    return {
      property: 'id',
      direction: Direction.ASC,
    };
  }

  showPage(i: number): void {
    this.actualPage = i;
    var init = (i - 1) * 10;
    var end = i * 10;
    this._dataToShow = this._data.results.bindings.slice(init, end);
  }

  createParams(data: any): HttpParams {
    let parameters = new HttpParams();
    this._data.head.vars.forEach((head) => {
      parameters = Helper.addParam(parameters, head, null);
    });

    return parameters;
  }
}
