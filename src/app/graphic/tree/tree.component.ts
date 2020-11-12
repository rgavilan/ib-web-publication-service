import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
})
export class TreeComponent implements OnInit {
  @Output() filterChanged: EventEmitter<any> = new EventEmitter<any>();
  @Input() data = {
    name: 'Áreas',
    children: [
      {
        name: 'Ciencias y tecnologías quimicas',
        value: 'CTQ',
        children: [
          {name: 'Ingeniería Química', value: 'IQM'},
          {name: 'Química', value: 'QMC'}
        ]
      },
      {
        name: 'Energía y transporte',
        value: 'EYT',
        children: [
          {name: 'Energía', value: 'ENE'},
          {name: 'Transporte', value: 'TRA'}
        ]
      },
      {
        name: 'Ciencias físicas',
        value: 'FIS',
        children: [
          {name: 'Astonomía y astrofísica', value: 'AYA'},
          {name: 'Investigación espacial', value: 'ESP'},
          {name: 'Física fundamenta y de partículas', value: 'FFP'},
          {name: 'Física y sus aplicaciones', value: 'FYA'}
        ]
      }
    ],
  };
  filterDate: any;
  options: any;
  filter = [];

  constructor() {}

  ngOnInit(): void {
    this.filterDate = this.data;
    this.options = {
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
      },
      series: [
        {
          type: 'tree',
          data: [this.data],
          top: '1%',
          left: '7%',
          bottom: '1%',
          right: '20%',
          symbolSize: 7,
          label: {
            position: 'left',
            verticalAlign: 'middle',
            align: 'right',
            fontSize: 9,
          },

          leaves: {
            label: {
              position: 'right',
              verticalAlign: 'middle',
              align: 'left',
            },
          },

          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750,
        },
      ],
    };
  }
  /**
   * Method invoked when the chart is initialized
   * param e
   */
  onChartInit(chartInstance: any) {
  }

  

  chartClick(event) {
    this.filter = [];
    const dataTofilter = [];
    let keyToFilter = null;
    const keysToRemove = [];
    this.data.children.forEach((element, key) => {
        if (element.value === event.value) {
          keyToFilter = key;
          dataTofilter.push(event.value);
          element.children.forEach(element2 => {
            dataTofilter.push(element2.value);
          });
        } else {
          element.children.forEach((element2) => {
            if (element2.value === event.value) {
              keyToFilter = key;
              dataTofilter.push(element2.value);
            }
          });
        }
    });
    this.filterDate = this.data;
    this.filterDate.children.forEach((element, key) => {
      if (key !== keyToFilter) {
        // añado solo el emento padre
        this.filter.push(element.value);
      } else {
        element.children.forEach(element2 => {
          if (event.value !== element2.value) {
            keysToRemove.push(element2.value);
          } else {
            this.filter.push(element2.value);
          }
        });
      }
    });
    this.filterChanged.emit(this.filter.filter((v, i, a) => a.indexOf(v) === i));
  }
  
}
