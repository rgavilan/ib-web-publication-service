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
    icon: 'oi-home',
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
    title: 'menu.university',
    icon: 'oi-bar-chart',
    url: '/main/home',
  },
  {
    title: 'menu.scientist',
    icon: 'oi-bar-chart',
    url: '/main/home',
  },
  {
    title: 'menu.category-inves',
    icon: 'oi-bar-chart',
    url: '/main/home',
  },
  {
    title: 'menu.prod-scientist',
    icon: 'oi-bar-chart',
    url: '/main/home',
  },
  {
    title: 'menu.acction-inves',
    icon: 'oi-bar-chart',
    url: '/main/home',
  },
  {
    title: 'menu.stats',
    icon: 'oi-bar-chart',
    url: '/main/home',
  },
  {
    title: 'menu.sparql',
    icon: 'oi-terminal',
    url: '/main/sparql',
  },
  {
    title: 'menu.graphics',
    icon: 'oi-bar-chart',
    url: '/main/graphics',
  },
];
