import {Component, Input, OnInit} from '@angular/core';
import {Person} from '../../model/person';
import {FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PersonService} from '../service/person.service';
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

  titulo: string;
  personForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private personService: PersonService,
              private router: Router, private _snakBar: MatSnackBar) {
    this.personForm = this.formBuilder.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', [Validators.required, Validators.maxLength(100)]],
      age: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  public saveData() {

    const persona = new Person(this.personForm.value);
    console.log('Person: ');
    console.log(persona)
    if (persona.id) {
      this.personService.actualizarPersona(persona).pipe(catchError(err => {
        console.log('Ocurrio un error: ', err);

        this._snakBar.open(err, 'Cerrar', {
          duration: 2000,
          verticalPosition: 'top',
        });

        return throwError('No se crear la persona');
      }))
        .subscribe(token => {
          this.router.navigate(['home/persona/list']);
      });

    }
    else {
      this.personService.crearPersona(persona).pipe(catchError(err => {
        console.log('Ocurrio un error: ', err);

        this._snakBar.open(err, 'Cerrar', {
          duration: 2000,
          verticalPosition: 'top',
        });

        return throwError('No se actualizar la persona');
      }))
        .subscribe(token => {
          this.router.navigate(['home/persona/list']);
        });
    }

  }

  public errorNombre(): boolean{
    return this.personForm.controls.firstName.invalid &&
    (this.personForm.controls.firstName.dirty || this.personForm.controls.firstName.touched);
  }

  public errorApellido(): boolean{
    return this.personForm.controls.lastName.invalid &&
    (this.personForm.controls.lastName.dirty || this.personForm.controls.lastName.touched);
  }

  public errorEdad(): boolean{
    return this.personForm.controls.age.invalid &&
    (this.personForm.controls.age.dirty || this.personForm.controls.age.touched);
  }

  ngOnInit() {
      this.route.paramMap.subscribe(params => {
        if (params.get('id') != null) {
          this.titulo = 'Editar Persona';
          this.personService.findOne(+params.get('id')).subscribe(persona => {
            this.personForm.patchValue({
              id: persona.identificador(),
              firstName: persona.nombre(),
              lastName: persona.apellido(),
              age: persona.edad()
            });
          });
        } else {
          this.titulo = 'Crear Persona';
        }
      });
    }

}
