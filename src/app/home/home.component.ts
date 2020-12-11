import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HomeItem } from '../_models/home';
import { HomeService } from '../_services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  /**
   * Lista de categorias.
   */
  categoryItems: HomeItem[];

  /**
   * Categoria seleccionada.
   */
  category: string;

  constructor(
    // private router: Router,
    // private translate: TranslateService,
    private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.getCategories().then((categoryItems: HomeItem[]) => {
      this.categoryItems = categoryItems;
    });
  }
}
