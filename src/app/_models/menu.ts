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
  /**
   * Disabled.
   */
  disabled: boolean;
}

/**
 * Definición de los Items de menú
 */
export const MENU_ITEMS: MenuItem[] = [
  {
    title: 'menu.home',
    icon: 'oi-home',
    url: '/main/home',
    disabled: false
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
    disabled: false
  },
  {
    title: 'menu.scientist',
    icon: 'oi oi-person',
    url: '/main/categories/scientist',
    disabled: false
  },
  {
    title: 'menu.category-inves',
    icon: 'oi oi-folder',
    url: '/main/home',
    disabled: true
  },
  {
    title: 'menu.prod-scientist',
    icon: 'oi oi-box',
    url: '/main/home',
    disabled: true
  },
  {
    title: 'menu.acction-inves',
    icon: 'oi oi-pencil',
    url: '/main/categories/investigation-actions',
    disabled: false
  },
  {
    title: 'menu.stats',
    icon: 'oi-bar-chart',
    url: '/main/home',
    disabled: true
  },
  {
    title: 'menu.sparql',
    icon: 'oi-terminal',
    url: '/main/sparql',
    disabled: false
  },
  {
    title: 'menu.graphics',
    icon: 'oi-bar-chart',
    url: '/main/graphics',
    disabled: true
  },
];
