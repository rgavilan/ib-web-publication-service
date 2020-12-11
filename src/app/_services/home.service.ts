import { Injectable } from '@angular/core';
import { CATEGORY_ITEMS, HomeItem } from '../_models/home';

/**
 * Servicio para gestionar el home de la aplicación.
 */
@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor() { }

  /**
   * Obtiene los datos dela opción categorías del home.
   * @returns Promesa con las categorías.
   */
  getCategories(): Promise<HomeItem[]> {
    return Promise.resolve(CATEGORY_ITEMS);
  }
}
