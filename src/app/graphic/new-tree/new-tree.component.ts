import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

/**
 *
 *
 * @export
 * @class NewTreeComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-new-tree',
  templateUrl: './new-tree.component.html',
  styleUrls: ['./new-tree.component.css']
})
export class NewTreeComponent implements OnInit {
  @Output() filterChanged: EventEmitter<any> = new EventEmitter<any>();
  @Input() data = {
    name: 'Áreas',
    children: [
      {
        name: 'Ciencias matemáticas, físicas, químicas e ingenierías',
        value: 'CMIFQ',
        selected: false,
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
        selected: false,
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
  filter = [];
  /**
   * Creates an instance of NewTreeComponent.
   * @memberof NewTreeComponent
   */
  constructor() { }

  ngOnInit(): void {
  }

  /**
   *
   *
   * @param {*} area
   * @param {*} parentToRemove
   * @memberof NewTreeComponent
   */
  areaClicked(area, parentToRemove) {
    // si selecciono un hijo el padre se tiene que ir
    if (parentToRemove && !parentToRemove.selected) {
      const indexToRemove = this.filter.indexOf(parentToRemove.value);
      if (indexToRemove !== -1) {
        this.filter.splice(indexToRemove, 1);
      }
    }
    if (area.selected) {
      this.filter.push(area.value);
      if (parentToRemove && parentToRemove.selected) {
        const indexToRemove1 = this.filter.indexOf(parentToRemove.value);
        if (indexToRemove1 !== -1) {
          this.filter.splice(indexToRemove1, 1);
        }
      }
    } else {
      if (parentToRemove && parentToRemove.selected) {
        this.filter.push(parentToRemove.value);
        this.removeInsedeObject(area, null);
      } else {
        this.removeInsedeObject(area, null);
      }
    }
    this.filter = this.filter.filter((v, i, a) => a.indexOf(v) === i);
    this.filterChanged.emit(this.filter);
  }

  /**
   *
   *
   * @param {*} area
   * @param {*} parentToRemove
   * @memberof NewTreeComponent
   */
  removeInsedeObject(area, parentToRemove) {
    const indexToRemove1 = this.filter.indexOf(area.value);
    if (indexToRemove1 !== -1) {
      this.filter.splice(indexToRemove1, 1);
      area.selected = false;
      if (parentToRemove && parentToRemove.selected) {
        this.filter.push(parentToRemove.value);
      } else if (parentToRemove && !parentToRemove.selected) {
        parentToRemove.selected = false;
      }
    }
    area.children.forEach(element => {
      const indexToRemove = this.filter.indexOf(element.value);
      if (indexToRemove !== -1) {
        this.filter.splice(indexToRemove, 1);
        element.selected = false;
      }
      if (element.children) {
        this.removeInsedeObject(element, element);
      }
    });
  }

}
