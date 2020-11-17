import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
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
  dataTofilter = [];

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
          lineStyle: {
            width: 3,
            curveness: 0.3
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
    chartInstance.on('click', (e) => {
      const chartTree = this.echarts.options.series[0].data[0];
      const nodeSelected = this.isNodeSelected(chartTree, e.name);
      if (nodeSelected){
        this.cleanTree(this.echarts);
      } else {
        this.paintBranch(this.echarts, e.name);
      }
    });
  }

  cleanTree(chartInstance){
    const clonedData = this.cloneDeepObjects(this.data);
    chartInstance.setOption({
      series: [{ type: 'tree', id: '0', data: clonedData }]
    }, false);
  }

  paintBranch(chartInstance, nodeName){
    const nodesForPaint = [];
    let newSeries     = null;
    const mainOption    = null;
  
    this.traverseFrom({
      nodeName,
      callback: node => nodesForPaint.push(node.name),
      skipStartNode: true
    });
  
    if (nodesForPaint){
      const hoverStyle = { lineStyle: { color: 'black' }};
      newSeries = this.buildSeriesConfig(nodesForPaint, hoverStyle);
    } else {
      // throw 'Nodes for paint is not exists';
    }
  
    if (newSeries){
      chartInstance.setOption({
        series: [{ type: 'tree', id: '0', data: newSeries }]
      }, false);
    } else {
     //  throw 'New series config is not builded'
    }
  }

  buildSeriesConfig(nodes, style){
    const seriesConfig = this.cloneDeepObjects(this.echarts.options.series[0].data[0]);
    const nodes1 = nodes.flat();
  
    this.traverse(seriesConfig, node => {
      if (nodes1.includes(node.name)){
        Object.assign(node, style);
      }
    });
    return seriesConfig;
  }

  cloneDeepObjects(object: any) {
    if (object === undefined || object === null) {
        return object;
    }
    return JSON.parse(JSON.stringify(object));
  }

  isNodeSelected(tree, nodeName){
    let status = false;
    this.traverseFrom({
      tree,
      nodeName,
      callback: node => {
        console.log(node.hasOwnProperty('lineStyle'));
        node.hasOwnProperty('lineStyle') ?  status = true :  status = false;
      },
      skipStartNode: true
    });
    return status;
  }

  traverseFrom(opts){
    const defaults = { tree: this.data, nodeName: null, callback: null, skipStartNode: false };
    Object.assign(defaults, opts);
  
    let targetNode = null;
  
    // Find node for start paint
    this.traverse(defaults.tree, node => {
      if (node.name === defaults.nodeName){
        targetNode = node;
      }
    });
    // Find all children of found node
    this.traverse(targetNode, node => {
      if (defaults.skipStartNode && node.name === defaults.nodeName){
        // Skip first because it is start branch
      } else {
        defaults.callback(node);
      }
    });
  }

  traverse(node, callback){
    if (node.children){
      callback(node);
      node.children.forEach(subNode => this.traverse(subNode, callback));
    } else {
      callback(node);
    }
  }

  

  chartClick(event) {
  /*  this.filter = [];
    // chequear primero si ya existe
    this.data.children.forEach((element, key) => {
        if (element.value === event.value) {
          // entro en primer nivel agrego el nivel
          this.dataTofilter.push(event.value);
          element.children.forEach((element2) => {
              const indexExist = this.dataTofilter.indexOf(element2.value);
              console.log(indexExist);
              if (indexExist !== -1) {
                this.dataTofilter.splice(indexExist, 1);
              }
            });
        } else {       
          element.children.forEach((element2) => {
            if (element2.value === event.value) {
                const indexExist2 = this.dataTofilter.indexOf(element.value);
                if (indexExist2 !== -1) {
                  // elimino el padre
                  this.dataTofilter.splice(indexExist2, 1);
                } else {
                  this.dataTofilter.push(element.value);
                }
                // asi el hijo existe lo quito
                const indexExist = this.dataTofilter.indexOf(element2.value);
                if (indexExist !== -1) {
                  this.dataTofilter.splice(indexExist, 1);
                } else {
                  this.dataTofilter.push(element2.value);
                }
            }
          });
    }});
    this.dataTofilter = this.dataTofilter.filter((v, i, a) => a.indexOf(v) === i);
    this.filterChanged.emit(this.dataTofilter);*/
  }

  
}
