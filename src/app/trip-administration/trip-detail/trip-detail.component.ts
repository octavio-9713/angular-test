import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BusService} from '../../services/bus.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Bus} from '../../model/bus';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {TripService} from '../../services/trip.service';
import {Trip} from '../../model/trip';
import {Person} from '../../model/person';
import {PersonService} from '../../person/service/person.service';
import * as moment from 'moment';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss']
})
export class TripDetailComponent implements OnInit {

  titulo: string;
  buses: Bus[];
  tripForm: FormGroup;
  availablePersons: Person[];
  selectedPersonsControl = new FormControl('', [Validators.required]);
  addedElemets: Person[] = [];

  constructor(private tripService: TripService, private router: Router, private route: ActivatedRoute,
              private _snackBar: MatSnackBar, private formBuilder: FormBuilder,
              private busService: BusService, private personService: PersonService) {
    this.tripForm = formBuilder.group({
      id: [''],
      departure: ['', Validators.required],
      destination: ['', [Validators.required]],
      bus: ['', Validators.required],
      passengers: [[], [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
    });
    busService.findAll().subscribe(buses => this.buses = buses);

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.get('id') != null) {

        this.titulo = 'Editar Viaje';
        this.tripService.findOne(+params.get('id')).subscribe(trip => {
          this.tripForm.patchValue({
            id: trip.id,
            departure: trip.departure,
            destination: trip.destination,
            bus: trip.bus,
            passengers: trip.passengers,
            startDate: moment(trip.startDate * 1000),
            endDate: moment(trip.endDate * 1000),
          });

          this.personService.findAll().subscribe(persons => {
            this.availablePersons = persons;

            this.tripForm.get('passengers').value.forEach(persona => {
              let esta = false;
              for (const p of this.availablePersons) {
                if (persona.id === p.id) {
                  esta = true;
                  break;
                }
              }
              if (esta) {
                const index = this.availablePersons.findIndex(p => p.id === persona.id);
                this.availablePersons.splice(index, 1);
              }
            });
            this.addedElemets = this.tripForm.get('passengers').value;
          });
        });
      } else {
        this.titulo = 'Crear Viaje';
        this.personService.findAll().subscribe(persons => {
          this.availablePersons = persons;
          console.log(this.availablePersons);
        });
      }
    });
  }

  public saveData() {

    // Transforma las fechas en unix time
    this.tripForm.get('endDate').setValue(this.tripForm.get('endDate').value.unix());
    this.tripForm.get('startDate').setValue(this.tripForm.get('startDate').value.unix());

    const trip = new Trip(this.tripForm.value);
    console.log('Guardando Viaje: ');
    console.log(trip);
    this.tripService.actualizarTrip(trip).pipe(catchError(err => {
      console.log('Ocurrio un error: ', err);

      this._snackBar.open(err, 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top',
      });

      this.tripForm.get('endDate').setValue(moment(this.tripForm.get('endDate').value * 1000));
      this.tripForm.get('startDate').setValue(moment(this.tripForm.get('startDate').value * 1000));

      return throwError('No se pudo completar la operacion');
    }))
      .subscribe(token => {
        this.router.navigate(['home', 'trip', 'list']);
      });
  }

  public passengers() {
    return this.tripForm.get('passengers').value;
  }

  public addAvailable() {
    this.selectedPersonsControl.value.forEach(person => {
      const index = this.availablePersons.findIndex(p => p.id === person.id);
      this.availablePersons.splice(index, 1);
      this.addedElemets.push(person);
    });

    this.tripForm.get('passengers').setValue(this.addedElemets);
    console.log(this.tripForm.get('passengers').value);
  }

  public removeSelected() {

    console.log(this.tripForm.get('passengers').value);
    console.log(this.addedElemets);

    this.addedElemets.forEach(persona => {
      let esta = false;
      for (const p of this.tripForm.get('passengers').value) {
        if (persona.id === p.id) {
          esta = true;
          break;
        }
      }
      if (!esta) {
        this.availablePersons.push(persona);
        const index = this.addedElemets.findIndex(p => p.id === persona.id);
        this.addedElemets.splice(index, 1);
      }
    });

    console.log(this.tripForm.get('passengers').value);
    console.log(this.addedElemets);

  }

  public errorDeparture() {
    return this.tripForm.controls.departure.invalid &&
      (this.tripForm.controls.departure.dirty || this.tripForm.controls.departure.touched);
  }

  public errorDestination() {
    return this.tripForm.controls.destination.invalid &&
      (this.tripForm.controls.destination.dirty || this.tripForm.controls.destination.touched);
  }

  public errorStart() {
    return this.tripForm.controls.startDate.invalid &&
      (this.tripForm.controls.startDate.dirty || this.tripForm.controls.startDate.touched);
  }

  public errorEnd() {
    return this.tripForm.controls.endDate.invalid &&
      (this.tripForm.controls.endDate.dirty || this.tripForm.controls.endDate.touched);
  }

  public errorBus() {
    return this.tripForm.controls.bus.invalid &&
      (this.tripForm.controls.bus.dirty || this.tripForm.controls.bus.touched);
  }

  public compareWith(o1: any, o2: any) {
    if (o1.name === o2.name && o1.id === o2.id ) {
      return true;
    }

    return false;
  }


}
