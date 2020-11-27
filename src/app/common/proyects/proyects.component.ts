import { Component, Input, OnInit } from '@angular/core';
import { FindRequest, Page, PageRequest } from 'src/app/_helpers/search';
import { SparqlResults } from 'src/app/_models/sparql';
import { ProjectService } from 'src/app/_services/project.service';

/**
 *
 *
 * @export
 * @class ProyectsComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',
  styleUrls: ['./proyects.component.css']
})
export class ProyectsComponent implements OnInit {
  @Input() universityId: string;
  allProjectFiltered: Page<SparqlResults>;
  filters: Map<string, string> = new Map();
  findRequest: FindRequest = new FindRequest();
  echartOptions: any;
  loadingData = false;
  loadedProjects = false;
  res: SparqlResults;
  /**
   * Creates an instance of ProyectsComponent.
   * @param {ProjectService} projectService
   * @memberof ProyectsComponent
   */
  constructor(
    private projectService: ProjectService
  ) {
  }

  /**
   *
   *
   * @memberof ProyectsComponent
   */
  ngOnInit(): void {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = 0;
    pageRequest.size = 10;
    this.findRequest.pageRequest = pageRequest;
    this.res = new SparqlResults();
    this.projectService.findProjectByFiltersfindProjectByFilters(this.findRequest).subscribe((data) => {
      this.allProjectFiltered = data;
      this.res.head = data.content[0].head;
      this.res.results = data.content[1].results;
      this.loadedProjects = true;
    });


    /*this.allProjectFiltered = this.projectService.findProjectByFilters(
      null, pageRequest
    );*/


    const xAxisData = [];
    const data1 = [];
    const data2 = [];

    for (let i = 0; i < 100; i++) {
      xAxisData.push('category' + i);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

    this.echartOptions = {
      legend: {
        data: ['bar', 'bar2'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'bar',
          type: 'bar',
          data: data1,
          animationDelay: (idx) => idx * 10,
        },
        {
          name: 'bar2',
          type: 'bar',
          data: data2,
          animationDelay: (idx) => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };
  }

  /**
   *
   *
   * @param {*} count
   * @return {*} 
   * @memberof ProyectsComponent
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

  /**
   *
   *
   * @memberof ProyectsComponent
   */
  onChartInit() {
    this.loadingData = true;
    console.log('chart init');
  }

  /**
   *
   *
   * @param {number} i
   * @memberof ScientificProductionComponent
   */
  allprojectsFilteredPageChanged(i: number): void {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = i;
    pageRequest.size = this.allProjectFiltered.size;
    pageRequest.property = this.allProjectFiltered.sort;
    pageRequest.direction = this.allProjectFiltered.direction;
    this.projectService.findProjectByFiltersfindProjectByFilters(this.findRequest).subscribe((data) => {
      this.allProjectFiltered = data;
      this.res.head = data.content[0].head;
      this.res.results = data.content[1].results;
      this.loadedProjects = true;
    });
  }


  /**
   *
   *
   * @param {*} event
   * @param {string} filterName
   * @memberof ScientificProductionComponent
   */
  filterProjects() {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = 0;
    pageRequest.size = this.allProjectFiltered.size;
    pageRequest.property = this.allProjectFiltered.sort;
    pageRequest.direction = this.allProjectFiltered.direction;
    this.projectService.findProjectByFiltersfindProjectByFilters(this.findRequest).subscribe((data) => {
      this.allProjectFiltered = data;
      this.res.head = data.content[0].head;
      this.res.results = data.content[1].results;
      this.loadedProjects = true;
    });
  }

}
