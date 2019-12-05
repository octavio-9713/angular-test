import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../security/service/authentication.service';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router,
              private authService: AuthenticationService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['home']);
    } else {
      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
      });
    }
  }

  public login() {

    console.log('Enter');

    this.authService.login(this.loginForm.value.username, this.loginForm.value.password)
      .pipe(catchError(err => {
        console.log('Ocurrio un error: ', err);

        this._snackBar.open(err, 'Cerrar', {
          duration: 2000,
          verticalPosition: 'top',
        });

        return throwError('No se pudo Loguear');
      }))
      .subscribe(token => {
        console.log('Se Logueo');
        this.router.navigate(['home']);
      });
  }

  public errorUsername() {
    return this.loginForm.controls.username.invalid &&
      (this.loginForm.controls.username.dirty || this.loginForm.controls.username.touched);
  }

  public errorPassword() {
    return this.loginForm.controls.password.invalid &&
      (this.loginForm.controls.password.dirty || this.loginForm.controls.password.touched);
  }

}
