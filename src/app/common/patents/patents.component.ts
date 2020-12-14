import { Component, Input, OnInit } from '@angular/core';
import { FindRequest, Page, PageRequest } from 'src/app/_helpers/search';
import { Helper } from 'src/app/_helpers/utils';
import { SparqlResults } from 'src/app/_models/sparql';
import { PatentService } from 'src/app/_services/patent.service';


/**
 *
 *
 * @export
 * @class PatentsComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-patents',
  templateUrl: './patents.component.html'
})
export class PatentsComponent implements OnInit {
  /**
   * university id for filter
   *
   * @type {string}
   * @memberof PatentsComponent
   */
  @Input() universityId: string;
  /**
   * all data shown on table
   *
   * @type {Page<SparqlResults>}
   * @memberof PatentsComponent
   */
  allPatentFiltered: Page<SparqlResults>;
  /**
   *
   *  find request
   * @type {FindRequest}
   * @memberof PatentsComponent
   */
  findRequest: FindRequest = new FindRequest();
  /**
   *
   *
   * @type {*}
   * @memberof PatentsComponent
   */
  echartOptions: any;
  /**
   *
   * if data from back is loadeding
   * @memberof PatentsComponent
   */
  loadingData = false;
  /**
   *
   *
   * @memberof PatentsComponent
   */
  loaded = false;

  /**
   * Creates an instance of PatentsComponent.
   * @param {PatentService} patentService
   * @memberof PatentsComponent
   */
  constructor(
    private patentService: PatentService) {
  }


  /**
   *
   *
   * @memberof PatentsComponent
   */
  ngOnInit(): void {

    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = 0;
    pageRequest.size = 10;
    this.findRequest.pageRequest = pageRequest;
    this.patentService.find(this.findRequest).subscribe(res => {
      this.allPatentFiltered = res;
      this.loaded = true;
    });
    const xAxisData = [];
    const data1 = [];
    const data2 = [];

    for (let i = 0; i < 100; i++) {
      xAxisData.push('category' + i);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

    const data = Helper.genData(3);
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
   * @memberof PatentsComponent
   */
  allPatentsFilteredPageChanged(i: number): void {
    this.findRequest.pageRequest.page = i - 1;
    this.findRequest.pageRequest.size = this.allPatentFiltered.size;
    this.patentService.find(this.findRequest).subscribe((data) => {
      this.allPatentFiltered = data;
      this.loaded = true;
    });
  }


  /**
   *
   *
   * @param {number} i
   * @memberof PatentsComponent
   */
  allPatentsFilteredSizeChanged(i: number): void {

    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = this.allPatentFiltered.number;
    pageRequest.size = i;
    pageRequest.direction = this.allPatentFiltered.direction;
    this.findRequest.pageRequest = pageRequest;
    this.patentService.find(this.findRequest).subscribe((data) => {
      this.allPatentFiltered = data;
      this.loaded = true;
    });
  }


  /**
   *
   *
   * @param {PageRequest} pageRequest
   * @memberof PatentsComponent
   */
  allPatentsFilteredSortChanged(pageRequest: PageRequest) {
    const newPageRequest: PageRequest = new PageRequest();
    newPageRequest.page = this.allPatentFiltered.number;
    newPageRequest.size = this.allPatentFiltered.size;
    newPageRequest.property = pageRequest.property;
    newPageRequest.direction = pageRequest.direction;
    this.findRequest.pageRequest = pageRequest;
    this.patentService.find(this.findRequest).subscribe((data) => {
      this.allPatentFiltered = data;
      this.loaded = true;
    });
  }

  /**
   *
   *
   * @memberof PatentsComponent
   */
  filterPatents() {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = 0;
    pageRequest.size = this.allPatentFiltered.size;
    this.findRequest.pageRequest = pageRequest;
    this.patentService.find(this.findRequest).subscribe((data) => {
      this.allPatentFiltered = data;
      this.loaded = true;
    });

  }


  /**
   *
   *
   * @memberof PatentsComponent
   */
  onChartInit() {
    this.loadingData = true;
  }

}
