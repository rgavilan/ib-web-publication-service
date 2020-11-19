import { Injectable } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import * as moment from 'moment';
import { Helper } from './utils';

@Injectable()
export class CustomNgbDateAdapter extends NgbDateAdapter<number> {
  /**
   * Converts native date to a NgbDateStruct
   */
  fromModel(date: number): NgbDateStruct {

    let result = null;

    if (date !== undefined && date !== null) {
      const momentDate = moment.utc(date);
      result = { year: momentDate.year(), month: momentDate.month() + 1, day: momentDate.date() };
    }

    return result;
  }

  /**
   * Converts a NgbDateStruct to a native date
   */
  toModel(date: NgbDateStruct): number {

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

}
