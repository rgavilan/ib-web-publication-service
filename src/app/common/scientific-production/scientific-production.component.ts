import { AfterContentInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { Direction, FindRequest, Order, Page, PaginatedSearchComponent } from 'src/app/_helpers/search';
import { Scientist } from 'src/app/_models/scientist';
import { ResearchmentStructuresService } from 'src/app/_services/researchment.structures.service';

@Component({
  selector: 'app-scientific-production',
  templateUrl: './scientific-production.component.html',
  styleUrls: ['./scientific-production.component.css']
})
export class ScientificProductionComponent extends PaginatedSearchComponent<Scientist> implements OnInit, AfterContentInit {
  @Input() universityId: string;
  filtersTop: Map<string, string> = new Map();
  filtersArea: Map<string, Array<string>> = new Map();
  constructor(router: Router,
              translate: TranslateService,
              toastr: ToastrService,
              private researchmentStructureService: ResearchmentStructuresService,
              private cdr: ChangeDetectorRef) {
    super(router, translate, toastr);
  }

  ngOnInit(): void {
    // agregar automatico que filtre por ID
    const page = this.researchmentStructureService.findResearchmentScientist(
      null
    );
    this.searchResult = page.content;
    page.uibPage = page.number + 1;
    this.resultObject = page;
    this.filterTopResearchmentStructures('type');


    const xAxisData = [];
    const data1 = [];
    const data2 = [];

    for (let i = 0; i < 100; i++) {
      xAxisData.push('category' + i);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }




  }

  ngAfterContentInit() {
  }

  protected findInternal(findRequest: FindRequest): Observable<Page<Scientist>> {
    const page = this.researchmentStructureService.findResearchmentScientist(
      null
    );

    this.searchResult = page.content;
    page.uibPage = page.number + 1;
    this.resultObject = page;
    this.findRequest.setOrder(
      findRequest.pageRequest.direction,
      findRequest.pageRequest.property
    );

    return of(this.resultObject);
  }
  protected removeInternal(entity: any): Observable<{} | Response> {
    throw new Error('Method not implemented.');
  }
  protected getDefaultOrder(): Order {
    return {
      property: 'code',
      direction: Direction.ASC
    };
  }

  /*
   * Filter researchment structures
   */
  filterTopResearchmentStructures(filterName: string) {
    switch (filterName) {
      case 'type':
        // si el valor viene undefined debería "resetar el valor para mostrar todo"
        this.findRequest.filter.type !== 'undefined' ? this.filtersTop.set(filterName, this.findRequest.filter.type)
          : this.filtersTop.set(filterName, '');
        break;
      default:
        break;
    }

    // Call service to load data filtered
    const page = this.researchmentStructureService.findTopResearchmentStructuresScientistByFilters(
      this.filtersTop
    );

    this.searchResult = page.content;
    page.uibPage = page.number + 1;
    this.resultObject = page;
  }

  filterArea(event) {
    console.log(event);
    this.findRequest.filter.area = event;
    this.filtersArea.set('area', this.findRequest.filter.area);
    const page = this.researchmentStructureService.filterArea(
      this.filtersArea
    );

    setTimeout(() => {
      this.searchResult = [...page.content];
      page.uibPage = page.number + 1;
      this.resultObject = page;
      this.cdr.detectChanges();
    }, 300);
    
  }

  returnAreaString(area) {
    let result = '';
    area.forEach(element => {
      result += element + ', ';
    });
    return  result;
  }
}
