import {Bus} from './bus';
import {formatDate, registerLocaleData} from '@angular/common';
import {Person} from './person';
import localeEsAr from '@angular/common/locales/es-AR';

registerLocaleData(localeEsAr, 'es-Ar');

export class Trip {

  id: number;
  departure: string;
  destination: string;
  bus: Bus;
  passengers: [Person];
  startDate: number;
  endDate: number;

  constructor(value: any) {
    Object.assign(this, value);
  }

  public getStartDate() {
    return formatDate(this.startDate * 1000, 'dd/MM/yyyy', 'es-Ar');
  }

  public getEndDate() {
    return formatDate(this.endDate * 1000, 'dd/MM/yyyy', 'es-Ar');
  }
}
