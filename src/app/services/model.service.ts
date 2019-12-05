import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Model} from '../model/model';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'my-auth-token'
    })};

  private resourceUrl = 'model/';

  constructor(private httpClient: HttpClient) { }

  public findAll(id: number): Observable<Model[]> {
    return this.httpClient.get<Object[]>(environment.backendUrl + this.resourceUrl + id).pipe(
      map(json => json.map(value => new Model(value)))
    );
  }


}
