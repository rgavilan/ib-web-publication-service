import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sector-chart',
  templateUrl: './researchment-structures-chart-by-financing.component.html',
  styleUrls: ['./researchment-structures-chart-by-financing.component.css']
})
export class ResearchmentStructuresByFinancingComponent implements OnInit {

  @Input()
  data: any;


  echartOptions: any;

  constructor() { }

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
      'Verificación 1',
      'Acreditación 1',
      'Acreditación de las dimensiones adicionales 1',
      'Certificación del sistema de garantía interna de la calidad (SGIC) de centro 1',
      'Centro acreditado institucionalmente 1',
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
