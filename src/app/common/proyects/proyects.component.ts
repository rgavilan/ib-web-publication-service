import { Component, Input, OnInit } from '@angular/core';
import { FindRequest, Page, PageRequest } from 'src/app/_helpers/search';
import { SparqlResults } from 'src/app/_models/sparql';
import { ProjectService } from 'src/app/_services/project.service';
import { Helper } from 'src/app/_helpers/utils';

/**
 *
 *
 * @export
 * @class ProyectsComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html'
})
export class ProyectsComponent implements OnInit {
  /**
   *
   *
   * @type {string}
   * @memberof ProyectsComponent
   */
  @Input() universityId: string;
  /**
   *
   *
   * @type {string}
   * @memberof ProyectsComponent
   */
  @Input() chartType: string;
  /**
   *
   *
   * @type {Page<SparqlResults>}
   * @memberof ProyectsComponent
   */
  allProjectFiltered: Page<SparqlResults>;
  /**
   *
   *
   * @type {FindRequest}
   * @memberof ProyectsComponent
   */
  findRequest: FindRequest = new FindRequest();
  /**
   *
   *
   * @type {*}
   * @memberof ProyectsComponent
   */
  echartOptions: any;
  /**
   *
   *
   * @memberof ProyectsComponent
   */
  loadingData = false;
  /**
   *
   *
   * @memberof ProyectsComponent
   */
  loadedProjects = false;
  /**
   *
   *
   * @type {number}
   * @memberof ProyectsComponent
   */
  dateIni: number;
  /**
   *
   *
   * @type {number}
   * @memberof ProyectsComponent
   */
  dateFin: number;
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
    this.projectService.find(this.findRequest).subscribe((data) => {
      this.allProjectFiltered = data;
      this.loadedProjects = true;
    });

    let xAxisData: Array<string> = [];
    let data1: Array<any> = [];
    let data2: Array<any> = [];

    for (let i = 0; i < 100; i++) {
      xAxisData.push('category' + i);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }
    if (this.chartType === 'bar') {
      this.echartOptions = {
        legend: {
          data: ['Proyectos año 2019', 'Proyectos año 2020'],
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
            name: 'Proyectos año 2019',
            type: 'bar',
            data: data1,
            animationDelay: (idx) => idx * 10,
          },
          {
            name: 'Proyectos año 2020',
            type: 'bar',
            data: data2,
            animationDelay: (idx) => idx * 10 + 100,
          },
        ],
        animationEasing: 'elasticOut',
        animationDelayUpdate: (idx) => idx * 5,
      };
    } else {
      this.echartOptions = {
        series: [{
          type: 'treemap',
          data: [{
            name: 'Ciencias agrícolas y agroalimentarias',
            value: 10
          }, {
            name: 'Agricultura y Bosques',
            value: 20
          }, {
            name: 'Astronomía y astrofísica',
            value: 15
          }, {
            name: 'Biomedicina',
            value: 30
          }, {
            name: 'Economía',
            value: 30
          }, {
            name: 'Ciencia y tecnología ambiental',
            value: 30
          }, {
            name: 'Ciencia y tecnología de los alimentos',
            value: 30
          }, {
            name: 'Física fundamental y de partículas',
            value: 30
          }, {
            name: 'Producción industrial, ingeniería civil e ingeniería para la sociedad',
            value: 30
          }, {
            name: 'Ciencias de la vida',
            value: 30
          }, {
            name: 'Ciencias matemáticas',
            value: 30
          }, {
            name: 'Biología molecular y celular',
            value: 30
          }],
          label: {
            show: true
          },
          tooltip: {
            borderWidth: 0.5
          }
        }]
      };
    }


  }



  /**
   *
   *
   * @memberof ProyectsComponent
   */
  onChartInit() {
    this.loadingData = true;
  }


  /**
   *
   *
   * @param {number} i
   * @memberof ProyectsComponent
   */
  allprojectsFilteredPageChanged(i: number): void {
    this.findRequest.pageRequest.page = i - 1;
    this.findRequest.pageRequest.size = this.allProjectFiltered.size;
    this.projectService.find(this.findRequest).subscribe((data) => {
      this.allProjectFiltered = data;
      this.loadedProjects = true;
    });
  }


  /**
   *
   *
   * @param {number} i
   * @memberof ProyectsComponent
   */
  allprojectsFilteredSizeChanged(i: number): void {

    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = this.allProjectFiltered.number;
    pageRequest.size = i;
    pageRequest.direction = this.allProjectFiltered.direction;
    this.findRequest.pageRequest = pageRequest;
    this.projectService.find(this.findRequest).subscribe((data) => {
      this.allProjectFiltered = data;
      this.loadedProjects = true;
    });
  }


  /**
   *
   *
   * @param {PageRequest} pageRequest
   * @memberof ProyectsComponent
   */
  allprojectsFilteredSortChanged(pageRequest: PageRequest) {
    const newPageRequest: PageRequest = new PageRequest();
    newPageRequest.page = this.allProjectFiltered.number;
    newPageRequest.size = this.allProjectFiltered.size;
    newPageRequest.property = pageRequest.property;
    newPageRequest.direction = pageRequest.direction;
    this.findRequest.pageRequest = pageRequest;
    this.projectService.find(this.findRequest).subscribe((data) => {
      this.allProjectFiltered = data;
      this.loadedProjects = true;
    });
  }



  /**
   *
   *
   * @memberof ProyectsComponent
   */
  filterProjects() {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = 0;
    pageRequest.size = this.allProjectFiltered.size;
    this.findRequest.pageRequest = pageRequest;
    setTimeout(() => {
      if (this.dateIni) {
        const currentDate = Helper.parse(this.dateIni);
        if (currentDate) {
          this.findRequest.filter.start = currentDate;
        }
      }

      if (this.dateFin) {
        const currentDate = Helper.parse(this.dateFin);
        if (currentDate) {
          this.findRequest.filter.end = currentDate;
        }
      }
      this.projectService.find(this.findRequest).subscribe((data) => {
        this.allProjectFiltered = data;
        this.loadedProjects = true;
      });
    }, 0);
  }

}
