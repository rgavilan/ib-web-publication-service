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
    icon: 'oi-home',
    url: '/main/categories/researchmentStructures',
  },
  {
    title: 'menu.scientist',
    icon: 'oi oi-person',
    url: '/main/categories/scientist',
  },
  {
    title: 'menu.category-inves',
    icon: 'oi oi-folder',
    url: '/main/home',
  },
  {
    title: 'menu.prod-scientist',
    icon: 'oi oi-box',
    url: '/main/home',
  },
  {
    title: 'menu.acction-inves',
    icon: 'oi oi-pencil',
    url: '/main/categories/investigation-actions',
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
