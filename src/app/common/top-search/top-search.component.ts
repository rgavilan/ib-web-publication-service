import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { Direction, FindRequest, Order, Page, PaginatedSearchComponent } from 'src/app/_helpers/search';
import { ResearchmentStructure } from 'src/app/_models/researchmentStructure';
import { ResearchmentStructuresService } from 'src/app/_services/researchment.structures.service';

@Component({
  selector: 'app-top-search',
  templateUrl: './top-search.component.html',
  styleUrls: ['./top-search.component.css']
})
export class TopSearchComponent extends PaginatedSearchComponent<ResearchmentStructure> implements OnInit,  AfterContentInit {
  @Input() universityId: string;
  filtersTop: Map<string, string> = new Map();
  constructor(router: Router,
              translate: TranslateService,
              toastr: ToastrService,
              private researchmentStructureService: ResearchmentStructuresService) { 
                super(router, translate, toastr);
              }

  ngOnInit(): void {
    // agregar automatico que filtre por ID
    const page = this.researchmentStructureService.findResearchmentStructures(
      null
    );

    this.searchResult = page.content;
    page.uibPage = page.number + 1;
    this.resultObject = page;
    this.filterTopResearchmentStructures('qa');
  }

  ngAfterContentInit() {
  }

  protected findInternal(findRequest: FindRequest): Observable<Page<ResearchmentStructure>> {
    const page = this.researchmentStructureService.findResearchmentStructures(
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
      case 'qa':
        // si el valor viene undefined debería "resetar el valor para mostrar todo"
        this.findRequest.filter.qa !== 'undefined' ? this.filtersTop.set(filterName, this.findRequest.filter.qa) 
        : this.filtersTop.set(filterName, '');
        break;

      default:
        break;
    }

    // Call service to load data filtered
    const page = this.researchmentStructureService.findTopResearchmentStructuresByFilters(
      this.filtersTop
    );

    this.searchResult = page.content;
    page.uibPage = page.number + 1;
    this.resultObject = page;
  }

}
