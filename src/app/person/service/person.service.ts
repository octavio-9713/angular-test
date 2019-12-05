import { Injectable } from '@angular/core';
import {Person} from '../../model/person';
import {Observable, of, throwError} from 'rxjs';
import {catchError, first, map, mergeMap} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  // TODO: ES NECESARIO UN HEADER
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })};

  private resourceUrl = 'persons';

  constructor(private httpClient: HttpClient) { }

  public findAll(): Observable<Person[]> {
    return this.httpClient.get<Object[]>(environment.backendUrl + this.resourceUrl).pipe(
      map(json => json.map(value => new Person(value)))
    );
  }

  public findOne(id: number): Observable<Person> {
    return this.httpClient.get<Object>(environment.backendUrl + this.resourceUrl + '/' + id).pipe(
      map(json => new Person(json)));
  }

  public crearPersona(persona: Person): Observable<Object> {
    return this.httpClient.post(environment.backendUrl + this.resourceUrl, JSON.stringify(persona), this.httpOptions)
      .pipe(catchError(error => {
        console.error('Ha Ocurrido un error:', error.error);
        return throwError('No se Pudo crear la persona: ' + persona.showName()
          + ' debido a: ' + error.error.message );
      }));
  }

  // Esta bien asi??
  public actualizarPersona(persona: Person): Observable<Object> {
    return this.httpClient.put(environment.backendUrl + this.resourceUrl, JSON.stringify(persona), this.httpOptions)
      .pipe(catchError(error => {
        console.error('Ha Ocurrido un error:', error.error.message);
        return throwError('No se Pudo actualizar la persona: ' + persona.showName()
          + ' debido a: ' + error.error.message );
      }));
  }

  public borrarPersona(id: number): Observable<Object> {
    return this.httpClient.delete(environment.backendUrl + this.resourceUrl + '/' + id, this.httpOptions)
      .pipe(catchError(error => {
        console.error('Ha Ocurrido un error:', error.error.message);
        return throwError('No se eliminar la persona con id: ' + id
          + ' debido a: ' + error.error.message);
      }));
  }
}

