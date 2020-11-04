import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { stringify } from 'querystring';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  /**
   * Lista de categorias.
   */
  categories: Array<string> = [
    'Consultas SPARQL',
    'Gestión usuarios',
    'Estructuras de investigación',
    'Personal investigador',
    'Categorias de investigación',
    'Producción cientifica',
    'Acciones de investigación',
    'Estadisticas e indicadores',
    'Información del contrato URIs',
    'Validadores',
    'Backends SGI',
    'Renderización de metadatos de Named Graphs',
    'Información sobre Hercules',
    'Datos de contacto',
  ];

  /**
   * Categoria seleccionada.
   */
  category: string;

  constructor(private router: Router, private translate: TranslateService) {}

  ngOnInit(): void {
    this.category = '';
  }
}
