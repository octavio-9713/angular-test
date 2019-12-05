import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../service/authentication.service';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {environment} from "../../../environments/environment";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('Bloqueo Bloqueo Bloqueo');

    console.log(this.authService.isLoggedIn());

    console.log(req);

    if (this.authService.isLoggedIn()) {
      req = req.clone({
        headers: req.headers.set('Authorization', this.authService.token)
      });
    } else {
      if ((req.method !== 'POST') && (req.url !== environment.backendUrl + 'login')) {
        this.router.navigate(['login']);
        return of(null);
      }
    }
    console.log(req);

    return next.handle(req).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            console.log('Yay Funciona :', event);
          }
        },
        error => {
          if (event instanceof HttpResponse) {
            console.log('No funciona :', event);
          }
        }
      )
    );
  }
}
