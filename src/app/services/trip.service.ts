import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {Trip} from '../model/trip';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'my-auth-token'
    })};

  private resourceUrl = 'trips/';

  constructor(private httpClient: HttpClient) { }

  public findAll(): Observable<Trip[]> {
    return this.httpClient.get<Object[]>(environment.backendUrl + this.resourceUrl).pipe(
      map(json => json.map(value => new Trip(value)))
    );
  }

  public findOne(id: number): Observable<Trip> {
    return this.httpClient.get<Object>(environment.backendUrl + this.resourceUrl + id).pipe(
      map(json => new Trip(json)));
  }

  public actualizarTrip(trip: Trip): Observable<Object> {
    return this.httpClient.put(environment.backendUrl + this.resourceUrl, JSON.stringify(trip), this.httpOptions)
      .pipe(catchError(error => {
        console.error('Ha Ocurrido un error:', error.error);
        return throwError('No se Pudo actualizar el viaje debido a: ' + error.error.message );
      }));
  }

  public borrarTrip(id: number): Observable<Object> {
    return this.httpClient.delete(environment.backendUrl + this.resourceUrl + id, this.httpOptions)
      .pipe(catchError(error => {
        console.error('Ha Ocurrido un error:', error.error.message);
        return throwError('No se eliminar el viaje con id ' + id + ' debido a: ' + error.error.message);
      }));
  }
}
