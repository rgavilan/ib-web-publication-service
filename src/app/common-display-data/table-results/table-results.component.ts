import { HttpParams } from '@angular/common/http';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
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
import { SparqlResults } from 'src/app/_models/sparql';

@Component({
  selector: 'app-table-results',
  templateUrl: './table-results.component.html',
  styleUrls: ['./table-results.component.css'],
})
export class TableResultsComponent
  extends PaginatedSearchComponent<any>
  implements OnChanges {
  // use getter setter to define the property
  @Input()
  set data(val: SparqlResults) {
    // this._data = Object.assign({}, val);
    this._data = JSON.parse(JSON.stringify(val));
    if (val != null) {
      // this._data.results.bindings = this._data.results.bindings
      //   .concat(this._data.results.bindings)
      //   .concat(this._data.results.bindings);
      //this.showPage(1);
      // this.find();
    }
  }

  get data(): SparqlResults {
    return this._data;
  }

  /*
  * Data needed to set pagination if we have server pagination
  */
  @Input()
  pageInfo: Page<any>;

  /*
   * paginated is true is the query comes with page attributtes.
   * paginated is false if the query comes with all the data
   */
  @Input()
  paginated: boolean;

  page: number;


  @Output()
  callShowPage: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  callChangeSize: EventEmitter<number> = new EventEmitter<number>();

  /*
   * Initial data
   */
  _data: SparqlResults; // private property _data
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


  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges ');
    if (!!this.pageInfo) {
      this.page = this.pageInfo.number;
      this._dataToShow = this._data.results.bindings;
    }
    this.find();
  }

  protected findInternal(findRequest: FindRequest): Observable<Page<any>> {
    console.log('findInternal ' + this.data);
    const page: Page<any> = new Page<any>();
    if (!!this.pageInfo) {

      page.content = this._dataToShow;
      page.number = this.pageInfo.number - 1;
      if (this.pageInfo.number === 1) {
        page.first = true;
      }
      if (this.pageInfo.number === this.numPages) {
        page.last = true;
      }


      page.numberOfElements = Math.min(page.content.length, this.pageSize);
      page.size = this.pageSize;
      page.totalElements = this.pageInfo.totalElements;


    } else {
      if (findRequest.pageRequest.page === 0) {
        this.showPage(1);
        page.content = this._dataToShow;
        // page.content = this._data.results.bindings;

        page.first = true;
        page.last = false;

        page.number = 0;
        page.content = this._dataToShow;

        // this.searchResult = page.content;
        // this.resultObject = page;
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

      }


      page.numberOfElements = Math.min(page.content.length, this.pageSize);
      page.size = this.pageSize;
      page.totalElements = this._data.results.bindings.length;
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
    console.log('ShowPage' + i + ' - ' + this.findRequest.pageRequest.property + ' ' + this.findRequest.pageRequest.direction);
    if (!!this.findRequest.pageRequest.property) {
      this._data.results.bindings = this._data.results.bindings.sort((a, b) => {
        if (this.findRequest.pageRequest.direction === Direction.ASC) {
          return (a[this.findRequest.pageRequest.property].value > b[this.findRequest.pageRequest.property].value) ? 1 : -1;
        }
        return (a[this.findRequest.pageRequest.property].value <= b[this.findRequest.pageRequest.property].value) ? 1 : -1;
      });
    }
    const init = (i - 1) * this.pageSize;
    const end = i * this.pageSize;
    this._dataToShow = this._data.results.bindings.slice(init, end);
  }

  callShowPageWhenPageChanges(i: number): void {
    console.log('callShowPageWhenPageChanges' + i);
    this.findRequest.pageRequest.page = i;
    if (!this.pageInfo) {
      this.find();
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
