import { BASE_URL } from '../configuration';
import { HttpParams } from '@angular/common/http';
import { PageRequest } from './search';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
/**
 * Clase de ayuda para la realización de llamadas HTTP.
 */
export class Helper {
  /**
   * Completa la URL a llamar con la URL base.
   * @param fragment Fragmento de URL.
   */
  static getUrl(fragment: string) {
    return BASE_URL + fragment;
  }

  /**
   * Add a parameter to request parameter list.
   * @param params  request parameter list.
   * @param name parameter name.
   * @param value parameter value.
   * @returns new request params.
   */
  static addParam(params: HttpParams, name: string, value: string | number | Array<string>): HttpParams {
    if (value) {
      if (Array.isArray(value)) {
        value.forEach(element => {
          if (element !== '' && element !== 'undefined') {
            // params = params.append(name, element);
            params = params.append(`${name.toString()}`, element);
          }
        });
      } else {
        const strValue = String(value);
        if (strValue !== '' && strValue !== 'undefined') {
          params = params.append(name, strValue);
        }
      }

    }

    return params;
  }

  /**
   * Add pagination parameters to request parameter list.
   * @param params request parameter list.
   * @param pageRequest page request.
   * @returns new request params
   */
  static addPaginationParams(
    params: HttpParams,
    pageRequest: PageRequest
  ): HttpParams {
    if (pageRequest.size) {
      params = params.set('size', String(pageRequest.size));
    }

    if (pageRequest.page !== undefined) {
      params = params.set('page', String(pageRequest.page));
    }

    if (pageRequest.property) {
      let sort = pageRequest.property;

      if (pageRequest.direction) {
        sort += ',' + pageRequest.direction;
      }

      params = params.set('sort', sort);
    }

    return params;
  }

  /**
   * Converts a NgbDateStruct to a native date
   */
  static toModel(date: NgbDateStruct): number {

    let result = null;
    if (date && Number.isInteger(date.year) && Number.isInteger(date.month) && Number.isInteger(date.day)) {
      const newDate = moment.utc();
      newDate.set('year', date.year);
      newDate.set('month', date.month - 1);
      newDate.set('date', date.day);
      newDate.startOf('day');

      result = newDate.valueOf();
    }

    return result;
  }

  /**
   * Converts native date to a NgbDateStruct
   */
  static fromModel(date: number): NgbDateStruct {
    let result = null;

    if (date !== undefined && date !== null) {
      const momentDate = moment.utc(date);
      result = { year: momentDate.year(), month: momentDate.month() + 1, day: momentDate.date() };
    }

    return result;
  }



  static parse(value: number): any {
    const momentDate = moment.utc(value);
    if (momentDate.isValid()) {
      return momentDate.format('YYYY-MM-DD');
    } else {
      return null;
    }
  }
}
