import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Direction, FindRequest, Page, PageRequest } from 'src/app/_helpers/search';
import { SparqlResults } from 'src/app/_models/sparql';
import { ScientistService } from 'src/app/_services/scientist.service';
/**
 *
 *
 * @export
 * @class ScientistSearchComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-scientist-search',
  templateUrl: './scientist-search.component.html',
  styleUrls: ['./scientist-search.component.css']
})
export class ScientistSearchComponent implements OnInit {
  /**
   * university Id for search filter in case of necessary
   */
  @Input() universityId: string;
  allScientificsFiltered: Page<SparqlResults>;
  filters: Map<string, string> = new Map();
  findRequest: FindRequest = new FindRequest();
  echartOptions: any;

  loaded = false;

  /**
   * Constructor
   * param router 
   * param translate 
   * param toastr 
   * param researchmentStructureService 
   * param cdr 
   */
  constructor(
    private scientificsService: ScientistService,
    private cdr: ChangeDetectorRef) {
  }

  /**
   *
   *
   * @memberof ScientistSearchComponent
   */
  ngOnInit(): void {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = 1;
    pageRequest.size = 10;

    this.allScientificsFiltered = this.scientificsService.findTopByFilters(
      null, pageRequest
    );


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
        text: 'Personal por tipo filtrado por area',
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
   *
   * @param {number} i
   * @memberof ScientificProductionComponent
   */
  allScientistsFilteredPageChanged(i: number): void {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = i;
    pageRequest.size = this.allScientificsFiltered.size;
    pageRequest.property = this.allScientificsFiltered.sort;
    pageRequest.direction = this.allScientificsFiltered.direction;
    this.allScientificsFiltered = this.scientificsService.findTopByFilters(
      this.filters, pageRequest
    );
  }

  /**
   *
   *
   * @param {*} event
   * @param {string} filterName
   * @memberof ScientificProductionComponent
   */
  filterTop(event, filterName: string) {
    event !== 'undefined' ? this.filters.set(filterName, event) : this.filters.set(filterName, '');
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = 1;
    pageRequest.size = this.allScientificsFiltered.size;
    pageRequest.property = this.allScientificsFiltered.sort;
    pageRequest.direction = this.allScientificsFiltered.direction;
    // Call service to load data filtered
    this.allScientificsFiltered = this.scientificsService.findTopByFilters(
      this.filters, pageRequest
    );
  }

  filterPersonal() {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = 0;
    pageRequest.size = this.allScientificsFiltered.size;
    pageRequest.property = 'name';
    pageRequest.direction = Direction.ASC;
    this.findRequest.pageRequest = pageRequest;


    // setTimeout(() => {
    //   this.personalService.findProjectByFilters(this.findRequest).subscribe((data) => {
    //     this.allScientificsFiltered = data;
    //     this.loaded = true;
    //   });
    // }, 0);
  }

  /**
   *
   *
   * @param {*} count
   * @return {*} 
   * @memberof ScientistSearchComponent
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

}
