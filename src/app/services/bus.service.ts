import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {Bus} from '../model/bus';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'my-auth-token'
    })};

  private resourceUrl = 'buses/';

  constructor(private httpClient: HttpClient) { }

  public findAll(): Observable<Bus[]> {
    return this.httpClient.get<Object[]>(environment.backendUrl + this.resourceUrl).pipe(
      map(json => json.map(value => new Bus(value)))
    );
  }

  public findOne(id: number): Observable<Bus> {
    return this.httpClient.get<Object>(environment.backendUrl + this.resourceUrl + id).pipe(
      map(json => new Bus(json)));
  }

  public actualizarBus(bus: Bus): Observable<Object> {
    return this.httpClient.put(environment.backendUrl + this.resourceUrl, JSON.stringify(bus), this.httpOptions)
      .pipe(catchError(error => {
        console.error('Ha Ocurrido un error:', error.error);
        return throwError('No se Pudo actualizar el colectivo: ' + bus.licensePlate
                                    + ' debido a: ' + error.error.message );
      }));
  }

  public borrarBus(id: number): Observable<Object> {
    return this.httpClient.delete(environment.backendUrl + this.resourceUrl + id, this.httpOptions)
      .pipe(catchError(error => {
        console.error('Ha Ocurrido un error:', error.error.message);
        return throwError('No se eliminar el bus con id ' + id + ' debido a: ' + error.error.message);
      }));
  }
}
