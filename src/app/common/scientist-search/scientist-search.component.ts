import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { Direction, FindRequest, Order, Page, PaginatedSearchComponent } from 'src/app/_helpers/search';
import { ResearchmentStructure } from 'src/app/_models/researchmentStructure';
import { Scientist } from 'src/app/_models/scientist';
import { ResearchmentStructuresService } from 'src/app/_services/researchment.structures.service';

@Component({
  selector: 'app-scientist-search',
  templateUrl: './scientist-search.component.html',
  styleUrls: ['./scientist-search.component.css']
})
export class ScientistSearchComponent extends PaginatedSearchComponent<Scientist> implements OnInit,  AfterContentInit {
  @Input() universityId: string;
  filtersTop: Map<string, string> = new Map();
  data: any;
  constructor(router: Router,
              translate: TranslateService,
              toastr: ToastrService,
              private researchmentStructureService: ResearchmentStructuresService) { 
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
    return  {
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
        case 'area':
          // si el valor viene undefined debería "resetar el valor para mostrar todo"
          this.findRequest.filter.area !== 'undefined' ? this.filtersTop.set(filterName, this.findRequest.filter.area) 
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
  }

}
