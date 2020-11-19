import { Injectable } from '@angular/core';
import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';


@Injectable()
export class CustomNgbDatepickerI18n extends NgbDatepickerI18n {
    
    getDayAriaLabel(date: NgbDateStruct): string {
        return `${date.day}-${date.month}-${date.year}`;
    }

    getWeekdayShortName(weekday: number): string {
        const day = (weekday === 7) ? 0 : weekday;
        return moment.weekdaysShort()[day];
    }

    getMonthShortName(month: number): string {
        return moment.monthsShort()[month - 1];
    }

    getMonthFullName(month: number): string {
        return moment.months()[month - 1];
    }
}
