import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Brand} from '../model/brand';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'my-auth-token'
    })};

  private resourceUrl = 'brand/';

  constructor(private httpClient: HttpClient) { }

  public findAll(): Observable<Brand[]> {
    return this.httpClient.get<Object[]>(environment.backendUrl + this.resourceUrl).pipe(
      map(json => json.map(value => new Brand(value)))
    );
  }
}
