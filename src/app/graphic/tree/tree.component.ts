import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NgxEchartsDirective, NgxEchartsModule } from 'ngx-echarts';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
})
export class TreeComponent implements OnInit {
  @Output() filterChanged: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('echarts') echarts: NgxEchartsDirective;
  @Input() data = {
    name: 'Áreas',
    children: [
      {
        name: 'Ciencias y tecnologías quimicas',
        value: 'CTQ',
        lineStyle: { color: 'black' },
        children: [
          { name: 'Ingeniería Química', value: 'IQM' },
          { name: 'Química', value: 'QMC' }
        ]
      },
      {
        name: 'Energía y transporte',
        value: 'EYT',
        lineStyle: { color: 'black' },
        children: [
          { name: 'Energía', value: 'ENE' },
          { name: 'Transporte', value: 'TRA' }
        ]
      },
      {
        name: 'Ciencias físicas',
        value: 'FIS',
        lineStyle: { color: 'black' },
        children: [
          { name: 'Astonomía y astrofísica', value: 'AYA' },
          { name: 'Investigación espacial', value: 'ESP' },
          { name: 'Física fundamenta y de partículas', value: 'FFP' },
        ]
      }
    ],
  };
  filterDate: any;
  options: any;
  filter = [];
  dataTofilter = [];
  hoverStyle = { lineStyle: { color: 'black' } };
  level = 0;
  constructor() { }

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
          lineStyle: {
            width: 3,
            curveness: 0.3,
            color: 'grey'
          },
          leaves: {
            label: {
              position: 'right',
              verticalAlign: 'middle',
              align: 'left',
            },
          },

          expandAndCollapse: false,
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
    chartInstance.on('click', (e) => {
      const chartTree = chartInstance.getOption().series[0].data[0];
      const nodeSelected = this.isNodeSelected(chartTree, e.name);
      if (nodeSelected) {
        this.dataTofilter.splice(this.dataTofilter.indexOf(e.value), 1);
        e.data.lineStyle.color = 'grey';
      } else {
        const fisrt = this.isFirstLine(chartTree, e.name);
        if (!fisrt) {
          this.dataTofilter.push(e.value);
          delete e.data.lineStyle;
          !e.data.hasOwnProperty('lineStyle') ? Object.assign(e.data, this.hoverStyle) : e.data.lineStyle.color = 'black';
        } else {
          e.data.children.forEach(element => {
            this.dataTofilter.push(element.value); 
            !element.hasOwnProperty('lineStyle') ? Object.assign(element, this.hoverStyle) : element.lineStyle.color = 'black';
          });
        }
        
      }
      this.filter = chartInstance.getOption().series[0].data[0];
      // chequear primero si ya existe
      chartInstance.setOption({
        series: [{ data: [this.filter] }]
      }, false); 

      this.dataTofilter = this.dataTofilter.filter((v, i, a) => a.indexOf(v) === i);
      this.filterChanged.emit(this.dataTofilter);
    });
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
      console.log(subNode);
      !subNode.hasOwnProperty('lineStyle') ? Object.assign(subNode, { lineStyle: { color: 'grey' } }) : subNode.lineStyle.color = 'grey';
    });
  }

  isFirstLine(tree, nodeName): boolean {
    let status = false;
    tree.children.forEach(element => {
      if (element.name === nodeName) {  status = true; }
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
