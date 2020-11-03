import { Injectable } from '@angular/core';
import { FindRequest, Page, Direction } from '../_helpers/search';
import { User } from '../_models/user';
import { Helper } from '../_helpers/utils';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AbstractService } from '../_helpers/abstract';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';

/**
 * Servicio para la gestión de datos de usuario.
 */
@Injectable({
  providedIn: 'root',
})
export class ResearchmentStructuresService extends AbstractService {
  constructor(private httpClient: HttpClient) {
    super();
  }

  /**
   * Realiza la consulta de usuarios.
   * @param findRequest Datos de la consulta.
   * @returns Observable con el resultado de la consulta.
   */
  findUsers(findRequest: FindRequest): Observable<Page<User>> {
    // Filter params
    let parameters = new HttpParams();
    parameters = Helper.addParam(parameters, 'name', findRequest.filter.name);
    parameters = Helper.addParam(parameters, 'email', findRequest.filter.email);
    parameters = Helper.addParam(
      parameters,
      'enabled',
      findRequest.filter.enabled
    );
    // Pagination params
    parameters = Helper.addPaginationParams(
      parameters,
      findRequest.pageRequest
    );

    /*
    return this.httpClient
      .get(Helper.getUrl('/user/search'), {
        params: parameters,
      })
      .pipe(catchError(this.handleError));
    */
    const DUMMY_DATA: User[] = [
      {
        id: '1',
        name: 'Universidad de Murcia',
        email: 'murciauni@universidad.es',
        enabled: false,
        credentialsNonExpired: false,
        accountNonExpired: false,
        accountNonLocked: false,
        password: '',
        passwordRecoveryHash: '',
        passwordChanged: false,
        username: '',
        country: '',
        city: '',
        language: '',
        address: '',
        roles: null,
      },
      {
        id: '2',
        name: 'Universidad de Oviedo',
        email: 'oviedo@universidad.es',
        enabled: false,
        credentialsNonExpired: false,
        accountNonExpired: false,
        accountNonLocked: false,
        password: '',
        passwordRecoveryHash: '',
        passwordChanged: false,
        username: '',
        country: '',
        city: '',
        language: '',
        address: '',
        roles: null,
      },
    ];

    const page = new Page<User>();
    // const userList = User[];
    page.content = DUMMY_DATA;
    page.first = true;
    page.last = false;
    page.number = 1;
    page.numberOfElements = 1;
    page.size = 1;
    page.totalElements = 1;
    page.totalPages = 1;

    // return Promise.resolve(page);

    return of(page);
  }

  /**
   * Obtiene los datos de un usuario.
   * @param id ID del usuario.
   * @returns Observable con los datos del usuario.
   */
  get(id: string): Observable<User> {
    return this.httpClient
      .get(Helper.getUrl('/user/' + id))
      .pipe(catchError(this.handleError));
  }

  /**
   * Realiza el guardado de los datos de un usuario.
   * @param user Usuario a guardar.
   * @returns Observable con el resultado de la operación.
   */
  save(user: User): Observable<User> {
    return this.httpClient
      .post(Helper.getUrl('/user'), user)
      .pipe(catchError(this.handleError));
  }

  /**
   * Realiza la actualización de los datos de un usuario.
   * @param user Usuario a guardar.
   * @returns Observable con el resultado de la operación.
   */
  update(user: User): Observable<User> {
    return this.httpClient
      .put(Helper.getUrl('/user'), user)
      .pipe(catchError(this.handleError));
  }

  /**
   * Realiza la activación o desactivación de un usuario.
   * @param user Datos del usuario.
   * @returns Observable con el resultado de la operación.
   */
  toggle(user: User): Observable<any> {
    let observable: Observable<any>;

    if (user.accountNonLocked) {
      observable = this.httpClient.put(
        Helper.getUrl(`/user/${user.id}/disable`),
        null
      );
    } else {
      observable = this.httpClient.put(
        Helper.getUrl(`/user/${user.id}/enable`),
        null
      );
    }

    return observable.pipe(catchError(this.handleError));
  }

  /**
   * Obtiene los datos del usuario actual
   * @returns Observable con los datos del usuario actual.
   */
  getUserData(): Observable<User> {
    return this.httpClient
      .get(Helper.getUrl('/user'))
      .pipe(catchError(this.handleError));
  }
}
