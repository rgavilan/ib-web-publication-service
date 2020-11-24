![](./images/logos_feder.png)

# ASIO - Web publication service

Se trata del arquetipo para Front desarrollado en Angular.

## Características integradas

Dentro del proyecto base se integran las siguientes características:

- Frontend Angular 9.1

## Puesta en funcionamiento

npm install -> Descarga las librerías
npm run start -> lanza el

## Yasgui

Se configura la llamada al servicio que nos devuelve los datos con la variable endpoint de yasgui de los ficheros de la carpeta "enviroments".

## Table results component

Es un componente común y genérico que muestra los datos recibidos en formato SparQL en formato tabla.

Funciona de dos formas:

- Paginación en cliente. Sólo se la mandan los datos usando el atributo data y con el formato de respuesta genérico de consultas SparQL a TripleStores (SparlqlResults).

  ```
  <app-table-results [data]="data"></app-table-results>
  ```

  

- Paginación en servidor. En este caso, el componente es más complejo y puede recibir los siguientes inputs y outputs:

  - data:  Input con los datos con el formato de respuesta genérico de consultas SparQL a TripleStores (SparlqlResults).
  - pageInfo: Input con la información de la páginación en formato Page, se utilizan los atributos:
    - number -> numero
    - size -> numero de elementos q se muestran en una pagina
    - totalElements -> numero total elementos sin la paginacion
  - pageChanged: Output (Evento) con el nuevo número de página al que se quiere cambiar.
  - routerField: Se utiliza para redireccionar una fila de la tabla usando nombre del campo que se envía.
  - sizeChanged: Output (Evento) con el nuevo tamaño de los elementos que se van a mostraren la tabla.
  - sortChanged: Output (Evento) con un objeto de tipo PageRequest, del que interesan los campos property y direction, que indica la nueva ordenación de los elementos de la tabla.

    

  ```
  <app-table-results [data]="allResearchmentStructuresFiltered.content[0]"
  
  ​    [pageInfo]="allResearchmentStructuresFiltered" [routerField]="'name'"
  
  ​    (pageChanged)="allResearchmentStructuresFilteredPageChanged($event)"
  
  ​    (sizeChanged)="allResearchmentStructuresFilteredSizeChanged($event)"
  
  ​    (sortChanged)="allResearchmentStructuresFilteredSortChanged($event)">
  
    </app-table-results>
  ```

  