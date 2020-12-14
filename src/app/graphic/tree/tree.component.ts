import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html'
})
export class TreeComponent implements OnInit {
  @Output() filterChanged: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('echarts') echarts: NgxEchartsDirective;
  @Input() treeType = 'area';
  @Input() data = {
    name: 'Áreas - ',
    children: [
      {
        name: 'Ciencias matemáticas, físicas, químicas e ingenierías',
        value: 'CMIFQ',
        selected: true,
        children: [
          {
            name: 'Ciencias y tecnologías quimicas',
            value: 'CTQ',
            selected: false,
            children: [
              { name: 'Ingeniería Química', value: 'IQM', selected: false, children: [] },
              { name: 'Química', value: 'QMC', selected: false, children: [] }
            ]
          },
          {
            name: 'Energía y transporte',
            value: 'EYT',
            selected: false,
            children: [
              { name: 'Energía', value: 'ENE', selected: false, children: [] },
              { name: 'Transporte', value: 'TRA', selected: false, children: [] }
            ]
          },
          {
            name: 'Ciencias físicas',
            value: 'FIS',
            selected: false,
            children: [
              { name: 'Astonomía y astrofísica', value: 'AYA', selected: false, children: [] },
              { name: 'Investigación espacial', value: 'ESP', selected: false, children: [] },
              { name: 'Física fundamenta y de partículas', value: 'FFP', selected: false, children: [] },
              { name: 'Física y sus aplicaciones', value: 'FYA', selected: false, children: [] }
            ]
          },
          {
            name: 'Ciencias y Tecnologías de materiales',
            value: 'MAT',
            selected: false,
            children: [
              { name: 'Materiales para biomedicia', value: 'MBM', selected: false, children: [] },
              { name: 'Materiales para la energia y el medioambiente', value: 'MEN', selected: false, children: [] },
              { name: 'Materiales estructurales', value: 'MES', selected: false, children: [] },
              { name: 'Materiales con funcionalidad eléctrica, magnética, óptica o térmica', value: 'FYA', selected: false, children: [] }
            ]
          },
          {
            name: 'Ciencias matematicas',
            value: 'MTM',
            selected: false,
            children: []
          }
        ]
      },
      {
        name: 'Ciencias sociales y humanidades',
        value: 'CSH',
        selected: true,
        children: [
          {
            name: 'Ciencias sociales',
            value: 'CSO',
            selected: false,
            children: [
              { name: 'Comunicación', value: 'COM', children: [] },
              { name: 'Ciencia politica', value: 'CPO', children: [] },
              { name: 'Estudios feministas, de las mujeres y de genero', value: 'FEM', children: [] },
              { name: 'Geografía', value: 'GEO', children: [] },
              { name: 'Sociología y antropología social', value: 'SOC', children: [] },

            ]
          },
          { name: 'Derecho', value: 'DER', selected: false, children: [] },
          {
            name: 'Economía', value: 'ECO', selected: false, children: [
              { name: 'Economía y sus aplicaciones', value: 'EYA', selected: false, children: [] },
              { name: 'Empresas y finanzas', value: 'EYF', selected: false, children: [] },
              { name: 'Métodos de análisis ecónomico', value: 'MAE', selected: false, children: [] }
            ]
          },
        ]
      }

    ],
  };
  filterDate: any;
  options: any;
  filter = [];
  dataTofilter = [];
  hoverStyle = { lineStyle: { color: 'black' } };
  hoverStyleGrey = { lineStyle: { color: 'grey' } };
  selected = { selected: true };
  level = 0;
  constructor() {
    this.data.children.forEach(element => {
      this.dataTofilter.push(element.value);
    });
    this.dataTofilter = this.dataTofilter.filter((v, i, a) => a.indexOf(v) === i);
    this.filterChanged.emit(this.dataTofilter);
  }

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

  /**
   * returns if node has been selected
   * param tree (the full tree)
   * param nodeName (node name to search)
   */
  isNodeSelected(tree, nodeName) {
    let status = false;
    tree.children.forEach(element => {
      element.children.forEach(subNode => {
        if (nodeName === subNode.name) {
          status = this.findStyle(subNode) && subNode.lineStyle?.color === 'black';
          if (subNode.hasOwnProperty('children')) {
            this.cleanNode(subNode, nodeName);
          }
        } else {
          if (subNode.hasOwnProperty('children')) {
            this.searchInsedeNodes(subNode, nodeName);
          }
        }
      });
    });
    return status;
  }

  searchInsedeNodes(subnode, nodeName) {
    let status = false;
    subnode.children.forEach(subNode => {
      if (nodeName === subNode.name) {
        status = this.findStyle(subNode) && subNode.lineStyle?.color === 'black';
      } else {
        if (subNode.hasOwnProperty('children')) {
          this.searchInsedeNodes(subNode, nodeName);
        }
      }
    });
    return status;
  }

  cleanNode(subnode, nodeName) {
    subnode.children.forEach(subNode => {
      !subNode.hasOwnProperty('lineStyle') ? Object.assign(subNode, { lineStyle: { color: 'grey' } }) : subNode.lineStyle.color = 'grey';
    });
  }

  isFirstLine(tree, nodeName): boolean {
    let status = false;
    tree.children.forEach(element => {
      if (element.name === nodeName) { status = true; }
    });
    return status;
  }

  /**
   * finds if node has the property lineStyle
   * param node 
   */
  findStyle(node): boolean {
    return node.hasOwnProperty('lineStyle');
  }


}
