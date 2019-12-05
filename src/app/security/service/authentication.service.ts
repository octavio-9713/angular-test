import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt';
import {User} from '../../model/user';
import {catchError, filter, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private jwtHelper: JwtHelperService = new JwtHelperService();

  private _loggedIn: BehaviorSubject<User> = new BehaviorSubject(null);
  private something: Observable<unknown>;

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<any> {


    console.log('Enter To Log In');


    const body = {
      username,
      password
    };

    console.log(body);

    return this.httpClient.post(environment.backendUrl + 'login', body)
      .pipe(
        tap(responce =>
        {
          console.log(environment.backendUrl + 'login');
          localStorage.setItem(environment.tokenName, responce['token']);
          let decodedToken = this.jwtHelper.decodeToken(responce['token']);
          let user: User = new User ({username : decodedToken.username});

          this._loggedIn.next(user);
        }),
        catchError(responce => {
          let errorMessage: string;
          switch (responce.status) {

            case 401:
              errorMessage = 'El usuario o la Contraseña son incorrectos.';
              break;

            default:
              errorMessage = 'Error en el servidor';
          }
          return throwError(errorMessage);
        }),
      );
  }

  logout() {
    this._loggedIn.next(null);
    localStorage.removeItem(environment.tokenName);
    return this.router.navigate(['login']);
  }


  get loggedIn(): Observable<User> {
    return this._loggedIn.asObservable().pipe(filter(user => user !== null));
  }

  get token(): string {
    return localStorage.getItem(environment.tokenName);
  }

  isLoggedIn(): boolean {
    if ((this.token != null) && (!this.jwtHelper.isTokenExpired(this.token))) {
      if (this._loggedIn.value === null) {
        this._loggedIn.next(
          new User(
          { username: this.jwtHelper.decodeToken(this.token).username, }
          ));
      }
      return true;
    }
    return false;
  }
}
