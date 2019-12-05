import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators} from '@angular/forms';
import {Brand} from '../../model/brand';
import {BusService} from '../../services/bus.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Bus} from '../../model/bus';
import {BrandService} from '../../services/brand.service';
import {ModelService} from '../../services/model.service';
import {Observable, throwError} from 'rxjs';
import {Model} from '../../model/model';
import {catchError} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-buses-detail',
  templateUrl: './buses-detail.component.html',
  styleUrls: ['./buses-detail.component.scss']
})
export class BusesDetailComponent implements OnInit {

  titulo: string;
  busForm: FormGroup;
  brands: Brand[];
  models: Model[] = null;
  brandControl = new FormControl('', [Validators.required]);

  constructor(private busService: BusService, private router: Router, private route: ActivatedRoute,
              private _snackBar: MatSnackBar, private formBuilder: FormBuilder,
              private brandService: BrandService, private modelService: ModelService) {
    this.busForm = formBuilder.group({
      id: [''],
      licensePlate: ['', Validators.required],
      numberOfSeats: ['', [Validators.required, Validators.min(1)]],
      model: [null, Validators.required],
    });
    brandService.findAll().subscribe(brands => this.brands = brands);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.get('id') != null) {

        this.titulo = 'Editar Bus';
        this.busService.findOne(+params.get('id')).subscribe(bus => {
          this.busForm.patchValue({
            id: bus.id,
            licensePlate: bus.licensePlate,
            numberOfSeats: bus.numberOfSeats,
            model: bus.model,
          });
          this.brandControl.setValue(bus.model.brand);
          this.updateModels();
        });
      } else {
        this.titulo = 'Crear Bus';
      }
    });
  }

  public saveData() {
    const bus = new Bus(this.busForm.value);
    console.log('Guardando Bus: ');
    console.log(bus);
    this.busService.actualizarBus(bus).pipe(catchError(err => {
      console.log('Ocurrio un error: ', err);

      this._snackBar.open(err, 'Cerrar', {
        duration: 2000,
        verticalPosition: 'top',
      });

      return throwError('No se pudo completar la operacion');
    }))
      .subscribe(token => {
        this.router.navigate(['home', 'bus', 'list']);
      });
  }

  public updateModels() {
    if (this.brandControl.value) {
      this.modelService.findAll(this.brandControl.value.id).subscribe(models => this.models = models);
    } else {
      this.models = null;
    }
  }

  public selectedModel() {
    this.busForm.get('model').value.brand = this.brandControl.value;
  }

  public errorPatente() {
    return this.busForm.controls.licensePlate.invalid &&
      (this.busForm.controls.licensePlate.dirty || this.busForm.controls.licensePlate.touched);
  }

  public errorAsientos() {
    return this.busForm.controls.numberOfSeats.invalid &&
      (this.busForm.controls.numberOfSeats.dirty || this.busForm.controls.numberOfSeats.touched);
  }

  public errorModel() {
    return this.busForm.controls.model.invalid &&
      (this.busForm.controls.model.dirty || this.busForm.controls.model.touched);
  }

  public compareWith(o1: any, o2: any) {
    if (o1.name === o2.name && o1.id === o2.id ) {
      return true;
    }

    return false;
  }

}
