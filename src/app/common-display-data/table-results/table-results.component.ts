import { HttpParams } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import {
  FindRequest,
  Order,
  Page,
  PaginatedSearchComponent,
} from 'src/app/_helpers/search';
import { Helper } from 'src/app/_helpers/utils';

@Component({
  selector: 'app-table-results',
  templateUrl: './table-results.component.html',
  styleUrls: ['./table-results.component.css'],
})
export class TableResultsComponent
  extends PaginatedSearchComponent<any>
  implements OnInit {
  // use getter setter to define the property
  @Input()
  set data(val: any) {
    this._data = val;
    if (val != null) {
      this._data.results.bindings = this._data.results.bindings
        .concat(this._data.results.bindings)
        .concat(this._data.results.bindings);
      this.totalItems = this._data.results.bindings.length;
      this.showPage(1);
    }
  }

  get data(): any {
    return this._data;
  }

  /*
   * paginated is true is the query comes with page attributtes.
   * paginated is false if the query comes with all the data
   */
  @Input()
  paginated: boolean;

  @Input()
  page: number;

  @Input()
  totalItems: number;

  @Input()
  orderBy: Order;

  @Output()
  callShowPage: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  callChangeSize: EventEmitter<number> = new EventEmitter<number>();

  /*
   * Initial data
   */
  _data; // private property _data
  /*
   * Data that is shown in the actual page
   */
  _dataToShow;

  pageSize = 10;
  numPages = 1;

  constructor(
    router: Router,
    translate: TranslateService,
    toastr: ToastrService
  ) {
    super(router, translate, toastr);
  }

  ngOnInit(): void {
    // TODO: Initialize with page, total and number of elements
    console.log('ngOnInit ' + this.data);
    this.find();
  }

  protected findInternal(findRequest: FindRequest): Observable<Page<any>> {
    console.log('findInternal ' + this.data);

    const page: Page<any> = new Page<any>();
    if (findRequest.pageRequest.page === 0) {
      page.content = this._dataToShow;
      // page.content = this._data.results.bindings;

      page.first = true;
      page.last = false;

      page.number = 0;
      page.numberOfElements = Math.min(page.content.length, this.pageSize);
      page.size = this.pageSize;
      page.totalElements = this.totalItems;
      // page.uibPage = page.number + 1;
      // page.totalPages = this.numPages;

      this.searchResult = page.content;
      this.resultObject = page;
    } else {
      if (findRequest.pageRequest.page === 1) {
        page.first = true;
      }
      if (findRequest.pageRequest.page === this.numPages) {
        page.last = true;
      }

      this.showPage(findRequest.pageRequest.page);

      page.content = this._dataToShow;
      page.number = findRequest.pageRequest.page - 1;

      // const init = (findRequest.pageRequest.page - 1) * this.pageSize;
      // const end = findRequest.pageRequest.page * this.pageSize;
      // this._dataToShow = this._data.results.bindings.slice(init, end);
      // page.content

      // // Modificar
      // let parameters = new HttpParams();
      // this._data.head.vars.forEach((head) => {
      //   parameters = Helper.addParam(parameters, head, null);
      // });
      // parameters = Helper.addPaginationParams(
      //   parameters,
      //   findRequest.pageRequest
      // );
    }

    return of(page);
  }
  protected removeInternal(entity: any): Observable<{} | Response> {
    // throw new Error('Method not implemented.');
    return;
  }

  protected getDefaultOrder(): Order {
    // return {
    //   property: 'id',
    //   direction: Direction.ASC,
    // };
    // TODO set default order? Get input value for order?
    return new Order();
  }

  showPage(i: number): void {
    const init = (i - 1) * this.pageSize;
    const end = i * this.pageSize;
    this._dataToShow = this._data.results.bindings.slice(init, end);
  }

  callShowPageWhenPageChanges(i: number): void {
    console.log('callShowPageWhenPageChanges' + i);
    if (!this.paginated) {
      this.showPage(i);
    } else {
      this.callShowPage.next(i);
    }
  }

  callShowPageWhenSizeChanges(i: number): void {
    // const init = (i - 1) * this.pageSize;
    // const end = i * this.pageSize;
    // this._dataToShow = this._data.results.bindings.slice(init, end);
    console.log('callShowPageWhenSizeChanges' + i);
    this.callChangeSize.next(i);
  }

  createParams(data: any): HttpParams {
    let parameters = new HttpParams();
    this._data.head.vars.forEach((head) => {
      parameters = Helper.addParam(parameters, head, null);
    });

    return parameters;
  }
}
