/**
 * Definición de un Item del menú.
 */
export class MenuItem {
  /**
   * Título del menú.
   */
  title: string;
  /**
   * Icono.
   */
  icon: string;
  /**
   * URL.
   */
  url: string;
}

/**
 * Definición de los Items de menú
 */
export const MENU_ITEMS: MenuItem[] = [
  {
    title: 'menu.home',
    icon: 'ion-home',
    url: '/main/home',
  },
  /*
  {
    title: 'menu.users',
    icon: '',
    url: '/main/users'
  },
  */
  {
    title: 'menu.sparql',
    icon: '',
    url: '/main/sparql',
  },
  {
    title: 'menu.graphics',
    icon: '',
    url: '/main/graphics',
  },
];
