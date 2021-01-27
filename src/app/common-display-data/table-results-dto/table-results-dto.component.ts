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
import { SparqlResults } from 'src/app/_models/sparql';
import { TableResultsHeaderItem } from 'src/app/_models/table-results';


/**
 * Class that draw a table
 *
 * @export
 * @class TableResultsDtoComponent
 * @extends {PaginatedSearchComponent<any>}
 * @implements {OnChanges}
 * 
 * 
 * 
 *
 */
@Component({
  selector: 'app-table-results-dto',
  templateUrl: './table-results-dto.component.html',
  styleUrls: ['./table-results-dto.component.css'],
})
export class TableResultsDtoComponent
  extends PaginatedSearchComponent<any>
  implements OnChanges {

  /**
   * Mandatory to show the data in the table
   *
   * @memberof TableResultsDtoComponent
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

  @Input()
  headerData: TableResultsHeaderItem[];

  /**
   * Data needed to set pagination if we have server pagination
   * Data used of Page (mandatory) in this case:
   * 
   *
   * @type {Page<any>}
   * @memberof TableResultsDtoComponent
   */
  @Input()
  pageInfo: Page<any>;

  /**
   * reouterField sets a link on the row
   *
   * @type {string}
   * @memberof TableResultsDtoComponent
   */
  @Input()
  routerField: string;
  /**
   *
   *
   * @type {string}
   * @memberof TableResultsDtoComponent
   */
  @Input()
  routerNameLink = './';


  /**
   * Send the event when page is changed
   *
   * @type {EventEmitter<number>}
   * @memberof TableResultsDtoComponent
   */
  @Output()
  pageChanged: EventEmitter<number> = new EventEmitter<number>();

  /**
   * Send the event when page is changed
   *
   * @type {EventEmitter<number>}
   * @memberof TableResultsDtoComponent
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
    if (!!this.pageInfo) {
      this.dataCompleteToShow = this.dataComplete.results.bindings;
    }
    this.find();
  }

  protected findInternal(findRequest: FindRequest): Observable<Page<any>> {
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

        page.first = true;
        page.last = false;

        page.number = 0;

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

        page.number = findRequest.pageRequest.page - 1;

      }



      page.content = this.dataCompleteToShow;
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
    if (!!this.findRequest.pageRequest.property && this.dataComplete.head.vars.indexOf(this.findRequest.pageRequest.property) > 0) {
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
    this.findRequest.pageRequest.page = i;
    if (!this.pageInfo) {
      this.find();
    } else {
      this.pageChanged.emit(i);
    }
  }

  callShowPageWhenSizeChanges(i: number): void {
    this.findRequest.pageRequest.size = i;
    if (!this.pageInfo) {
      this.find();
    } else {
      this.sizeChanged.emit(i);
    }
  }

}
