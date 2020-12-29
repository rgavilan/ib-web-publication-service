import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';

/**
 *
 *
 * @export
 * @class TreeComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html'
})
export class TreeComponent implements OnInit {
  /**
   *
   *
   * @type {EventEmitter<any>}
   * @memberof TreeComponent
   */
  @Output() filterChanged: EventEmitter<any> = new EventEmitter<any>();
  /**
   *
   *
   * @type {NgxEchartsDirective}
   * @memberof TreeComponent
   */
  @ViewChild('echarts') echarts: NgxEchartsDirective;
  /**
   * type of tree data
   * @type {string}
   * @memberof TreeComponent
   */
  @Input() treeType = 'area';
  /**
   *
   *
   * @type {*}
   * @memberof TreeComponent
   */
  @Input() data: any;
  /**
   *
   *
   * @type {*}
   * @memberof TreeComponent
   */
  filterDate: any;
  /**
   *
   *
   * @type {*}
   * @memberof TreeComponent
   */
  options: any;
  /**
   * filter data
   * @type {Array}
   * @memberof TreeComponent
   */
  filter = [];
  /**
   * data to filter for emit
   * @type {array}
   * @memberof TreeComponent
   */
  dataTofilter = [];
  /**
   *
   * style for when selected
   * @memberof TreeComponent
   */
  hoverStyle = { lineStyle: { color: 'black' } };
  /**
   *
   * style for when is not selected
   * @memberof TreeComponent
   */
  hoverStyleGrey = { lineStyle: { color: 'grey' } };
  /**
   *
   *  selected option
   * @memberof TreeComponent
   */
  selected = { selected: true };
  /**
   *
   *  level of tree
   * @memberof TreeComponent
   */
  level = 0;
  constructor() {
  }

  ngOnInit(): void {
    if (this.treeType !== 'area') {
      this.data = {
        name: 'Publicación',
        children: [
          {
            name: 'Abstracts',
            value: 'ABS',
            selected: false,
            children: []
          },
          {
            name: 'Publicación académica',
            value: 'PUA',
            selected: true,
            children: [
              {
                name: 'Tesis',
                value: 'TES',
                selected: false,
                children: [{ name: 'Tesis de bachiller', value: 'TEB', selected: false, children: [] },
                { name: 'Tesis de doctoral', value: 'TED', selected: false, children: [] },
                { name: 'Tesis de master', value: 'TEM', selected: false, children: [] }]
              },
              { name: 'Contenido audiovisual', value: 'COV', selected: false, children: [] },
              { name: 'Catalogo', value: 'CAT', selected: false, children: [] }
            ]
          },
          {
            name: 'Artículo', value: 'ART', selected: false, children: [
              { name: 'Artículo Técnico', value: 'ATE', selected: false, children: [] }
            ]
          },
          { name: 'Publicación científica', value: 'PUC', selected: false, children: [] }

        ],
      };
    } else {
      this.data = {
        name: 'Áreas',
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
                  {
                    name: 'Materiales con funcionalidad eléctrica, magnética, óptica o térmica',
                    value: 'FYA', selected: false, children: []
                  }
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
    }
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
