import { Component, OnInit } from '@angular/core';
import {
  PaginatedSearchComponent,
  FindRequest,
  Page,
  Order,
  Direction,
} from '../../_helpers/search';
import { ResearchmentStructure } from '../../_models/researchmentStructure';
import { ResearchmentStructuresService } from '../../_services/researchment.structures.service';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import * as R from 'ramda';

/**
 * Rearchment Structure component
 */
@Component({
  selector: 'app-researchment-structures',
  templateUrl: './researchment-structures.component.html',
  styleUrls: ['./researchment-structures.component.css'],
})
export class ResearchmentStructuresComponent extends PaginatedSearchComponent<ResearchmentStructure> implements OnInit {
  echartOptions: any;
  filters: Map<string, string> = new Map();

  filtersTop: Map<string, string> = new Map();
  topSearchResult: any[];

  protected removeInternal(
    entity: ResearchmentStructure
  ): Observable<{} | Response> {
    throw new Error('Method not implemented.');
  }
  constructor(
    router: Router,
    translate: TranslateService,
    toastr: ToastrService,
    private researchmentStructureService: ResearchmentStructuresService
  ) {
    super(router, translate, toastr);
  }

  protected findInternal(
    findRequest: FindRequest
  ): Observable<Page<ResearchmentStructure>> {
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

  protected getDefaultOrder(): Order {
    return {
      property: 'name',
      direction: Direction.ASC,
    };
  }

  ngOnInit(): void {
    // TODO
    const page = this.researchmentStructureService.findResearchmentStructures(
      null
    );

    this.searchResult = page.content;
    this.topSearchResult = page.content.slice(0, 10);
    page.uibPage = page.number + 1;
    this.resultObject = page;
    this.findRequest.filter.top = 10;

    const xAxisData = [];
    const data1 = [];
    const data2 = [];

    for (let i = 0; i < 100; i++) {
      xAxisData.push('category' + i);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

    const data = this.genData(5);

    this.echartOptions = {
      title: {
        text: 'Núm. Universidades [Sello de Calidad]',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        type: 'scroll',
        orient: 'horizontal',
        right: 10,
        top: 30,
        bottom: 0,
        data: data.legendData,

        selected: data.selected,
      },
      series: [
        {
          name: 'Sello de Calidad',
          type: 'pie',
          radius: '55%',
          center: ['40%', '50%'],
          data: data.seriesData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
  }

  /**
   *
   * param count
   */
  genData(count) {
    const nameList = [
      'Verificación',
      'Acreditación',
      'Acreditación de las dimensiones adicionales',
      'Certificación del sistema de garantía interna de la calidad (SGIC) de centro',
      'Centro acreditado institucionalmente',
    ];
    const legendData = [];
    const seriesData = [];
    const selected = {};
    let name;

    for (let i = 0; i < count; i++) {
      name = nameList[i];
      legendData.push(name);
      seriesData.push({
        name,
        value: Math.round(Math.random() * 100000),
      });
      selected[name] = i < 6;
    }
    return {
      legendData,
      seriesData,
      selected,
    };
  }

  /*
   * Filter researchment structures
   */
  filterResearchmentStructures(filterName: string) {
    switch (filterName) {
      case 'type':
        this.findRequest.filter.type !== 'undefined' ? this.filters.set(filterName, this.findRequest.filter.type) :
        this.filters.set(filterName, '');

        break;

      default:
        break;
    }

    // Call service to load data filtered
    const page = this.researchmentStructureService.findResearchmentStructuresByFilters(
      this.filters
    );

    this.searchResult = page.content;
    page.uibPage = page.number + 1;
    this.resultObject = page;
  }

  /*
   * Filter researchment structures
   */
  filterTopResearchmentStructures(filterName: string) {
    switch (filterName) {
      case 'qa':
        // si el valor viene undefined debería "resetar el valor "
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

    this.topSearchResult = page.content;
    page.uibPage = page.number + 1;
    this.resultObject = page;
  }

  /*
  **************************************************************
  PRIVATE FUNCTIONS
  **************************************************************
  */
}
