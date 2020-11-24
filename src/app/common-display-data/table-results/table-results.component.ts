import { HttpParams } from '@angular/common/http';
import {
  Component,
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


/**
 * Class that draw a table
 *
 * @export
 * @class TableResultsComponent
 * @extends {PaginatedSearchComponent<any>}
 * @implements {OnChanges}
 * 
 * 
 * Ejemplo de llamada paginando desde cliente
 *  <app-table-results [data]="data"></app-table-results>
 * 
 * Ejemplo de llamada paginando desde servidor
 * <app-table-results [data]="allResearchmentStructuresFiltered.content[0]"
 *   [pageInfo]="allResearchmentStructuresFiltered" [routerField]="'name'"
 *   (pageChanged)="allResearchmentStructuresFilteredPageChanged($event)"
 *   (sizeChanged)="allResearchmentStructuresFilteredSizeChanged($event)"
 * (sortChanged)="allResearchmentStructuresFilteredSortChanged($event)">
 * </app-table-results>
 * 
 *
 */
@Component({
  selector: 'app-table-results',
  templateUrl: './table-results.component.html',
  styleUrls: ['./table-results.component.css'],
})
export class TableResultsComponent
  extends PaginatedSearchComponent<any>
  implements OnChanges {

  /**
   * Mandatory to show the data in the table
   *
   * @memberof TableResultsComponent
   */
  @Input()
  set data(val: SparqlResults) {
    // this.dataComplete = Object.assign({}, val);
    this.dataComplete = JSON.parse(JSON.stringify(val));
    // if (val != null) {
    // this.dataComplete.results.bindings = this.dataComplete.results.bindings
    //   .concat(this.dataComplete.results.bindings)
    //   .concat(this.dataComplete.results.bindings);
    // this.showPage(1);
    // this.find();
    // }
  }

  get data(): SparqlResults {
    return this.dataComplete;
  }

  /**
   * Data needed to set pagination if we have server pagination
   * Data used of Page (mandatory) in this case:
   * 
   *
   * @type {Page<any>}
   * @memberof TableResultsComponent
   */
  @Input()
  pageInfo: Page<any>;

  /**
   * reouterField sets a link on the row
   *
   * @type {string}
   * @memberof TableResultsComponent
   */
  @Input()
  routerField: string;


  /**
   * Send the event when page is changed
   *
   * @type {EventEmitter<number>}
   * @memberof TableResultsComponent
   */
  @Output()
  pageChanged: EventEmitter<number> = new EventEmitter<number>();

  /**
   * Send the event when page is changed
   *
   * @type {EventEmitter<number>}
   * @memberof TableResultsComponent
   */
  @Output()
  sizeChanged: EventEmitter<number> = new EventEmitter<number>();

  /*
   * Initial data
   */
  dataComplete: SparqlResults; // private property dataComplete
  /*
   * Data that is shown in the actual page
   */
  dataCompleteToShow;

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
      this.dataCompleteToShow = this.dataComplete.results.bindings;
    }
    this.find();
  }

  protected findInternal(findRequest: FindRequest): Observable<Page<any>> {
    console.log('findInternal ' + this.data);
    const page: Page<any> = new Page<any>();
    if (!!this.pageInfo) {

      page.content = this.dataCompleteToShow;
      page.number = this.pageInfo.number - 1;
      if (this.pageInfo.number === 1) {
        page.first = true;
      }
      if (this.pageInfo.number === this.numPages) {
        page.last = true;
      }


      page.numberOfElements = Math.min(page.content.length, this.pageInfo.size);
      page.size = this.pageInfo.size;
      page.totalElements = this.pageInfo.totalElements;


    } else {
      if (findRequest.pageRequest.page === 0) {
        this.showPage(1);
        page.content = this.dataCompleteToShow;
        // page.content = this.dataComplete.results.bindings;

        page.first = true;
        page.last = false;

        page.number = 0;
        page.content = this.dataCompleteToShow;

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

        page.content = this.dataCompleteToShow;

        page.number = findRequest.pageRequest.page - 1;

      }


      page.numberOfElements = Math.min(page.content.length, this.findRequest.pageRequest.size);
      page.size = this.findRequest.pageRequest.size;
      page.totalElements = this.dataComplete.results.bindings.length;
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
    return new Order();
  }

  showPage(i: number): void {
    console.log('ShowPage' + i + ' - ' + this.findRequest.pageRequest.property + ' ' + this.findRequest.pageRequest.direction);
    if (!!this.findRequest.pageRequest.property) {
      this.dataComplete.results.bindings = this.dataComplete.results.bindings.sort((a, b) => {
        if (this.findRequest.pageRequest.direction === Direction.ASC) {
          return (a[this.findRequest.pageRequest.property].value > b[this.findRequest.pageRequest.property].value) ? 1 : -1;
        }
        return (a[this.findRequest.pageRequest.property].value <= b[this.findRequest.pageRequest.property].value) ? 1 : -1;
      });
    }
    const init = (i - 1) * this.findRequest.pageRequest.size;
    const end = i * this.findRequest.pageRequest.size;
    this.dataCompleteToShow = this.dataComplete.results.bindings.slice(init, end);
  }

  callShowPageWhenPageChanges(i: number): void {
    console.log('callShowPageWhenPageChanges' + i);
    this.findRequest.pageRequest.page = i;
    if (!this.pageInfo) {
      this.find();
    } else {
      this.pageChanged.next(i);
    }
  }

  callShowPageWhenSizeChanges(i: number): void {

    console.log('callShowPageWhenSizeChanges' + i);
    this.findRequest.pageRequest.size = i;
    if (!this.pageInfo) {
      this.find();
    } else {
      this.sizeChanged.next(i);
    }
  }

  createParams(data: any): HttpParams {
    let parameters = new HttpParams();
    this.dataComplete.head.vars.forEach((head) => {
      parameters = Helper.addParam(parameters, head, null);
    });

    return parameters;
  }
}
