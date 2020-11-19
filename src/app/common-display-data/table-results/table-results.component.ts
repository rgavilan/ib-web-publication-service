import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  Direction,
  FindRequest,
  Order,
  Page,
  PaginatedSearchComponent,
} from 'src/app/_helpers/search';

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

  ngOnInit(): void {
    console.log(this.data);
  }

  protected findInternal(findRequest: FindRequest): Observable<Page<any>> {
    return of(this.data);
  }
  protected removeInternal(entity: any): Observable<{} | Response> {
    return of({});
  }
  protected getDefaultOrder(): Order {
    return {
      property: 'name',
      direction: Direction.ASC,
    };
  }

  showPage(i: number): void {
    this.actualPage = i;
    var init = (i - 1) * 10;
    var end = i * 10;
    this._dataToShow = this._data.results.bindings.slice(init, end);
  }
}
