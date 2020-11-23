import { AfterContentInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { Direction, FindRequest, Order, Page, PageRequest, PaginatedSearchComponent } from 'src/app/_helpers/search';
import { Scientist } from 'src/app/_models/scientist';
import { SparqlResults } from 'src/app/_models/sparql';
import { ResearchmentStructuresService } from 'src/app/_services/researchment.structures.service';
import { ScientificProductionService } from 'src/app/_services/scientificProduction.service';

@Component({
  selector: 'app-scientific-production',
  templateUrl: './scientific-production.component.html',
  styleUrls: ['./scientific-production.component.css']
})
export class ScientificProductionComponent implements OnInit, AfterContentInit {
  @Input() universityId: string;
  allResearchmentStructuresFiltered: Page<SparqlResults>;

  filters: Map<string, string> = new Map();

  findRequest: FindRequest = new FindRequest();
  constructor(
    private scientificProductionService: ScientificProductionService,
    private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = 1;
    pageRequest.size = 10;

    this.allResearchmentStructuresFiltered = this.scientificProductionService.findScientificProductionByFilters(
      null, pageRequest
    );

    console.log(this.allResearchmentStructuresFiltered);


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


  allScientificProductionFilteredPageChanged(i: number): void {
    console.log('allResearchmentStructuresFilteredPageChanged');

    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = i;
    pageRequest.size = this.allResearchmentStructuresFiltered.size;
    pageRequest.property = this.allResearchmentStructuresFiltered.sort;
    pageRequest.direction = this.allResearchmentStructuresFiltered.direction;

    //  const map: Map<string, string> = new Map(Object.entries(this.findRequest.filter));

    this.allResearchmentStructuresFiltered = this.scientificProductionService.findScientificProductionByFilters(
      this.filters, pageRequest
    );
  }



  filterArea(event) {
    console.log(event);
    this.findRequest.filter.area = event;
    /*this.filtersArea.set('area', this.findRequest.filter.area);
    const page = this.researchmentStructureService.filterArea(
      this.filtersArea
    );

    setTimeout(() => {
      this.searchResult = [...page.content];
      page.uibPage = page.number + 1;
      this.resultObject = page;
      this.cdr.detectChanges();
    }, 300);*/

  }

  returnAreaString(area) {
    let result = '';
    area.forEach(element => {
      result += element + ', ';
    });
    return result;
  }
}
