import { Component, OnInit } from '@angular/core';
import {
  Page,
} from '../../_helpers/search';
import { ResearchmentStructuresService } from '../../_services/researchment.structures.service';
import { SparqlResults } from 'src/app/_models/sparql';

/**
 * Rearchment Structure component
 */
@Component({
  selector: 'app-researchment-structures',
  templateUrl: './researchment-structures.component.html',
  styleUrls: ['./researchment-structures.component.css'],
})
export class ResearchmentStructuresComponent
  implements OnInit {
  echartOptions: any;
  filters: Map<string, string> = new Map();

  filtersTop: Map<string, string> = new Map();
  topSearchResult: any[];

  allResearchmentStructuresFiltered: Page<SparqlResults>;

  constructor(
    private researchmentStructureService: ResearchmentStructuresService
  ) {

  }

  ngOnInit(): void {


    // Gráficas
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
  **************************************************************
  PRIVATE FUNCTIONS
  **************************************************************
  */
}
