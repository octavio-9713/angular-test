import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {Person} from "../../model/person";
import {BusService} from "../../services/bus.service";
import {Bus} from "../../model/bus";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-buses-list',
  templateUrl: './buses-list.component.html',
  styleUrls: ['./buses-list.component.scss']
})
export class BusesListComponent implements OnInit {

  buses: MatTableDataSource<Bus>;

  columnsToDisplay = ['licence', 'model', 'brand', 'seats', 'options'];

  @ViewChild(MatPaginator, {static: true})
  paginator: MatPaginator;


  constructor(private busService: BusService, private router: Router, private _snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.busService.findAll().subscribe(listado => {
      this.buses = new MatTableDataSource<Bus>(listado);
      this.buses.paginator = this.paginator;
    });
  }


  goToDetail(bus: Bus) {
    this.router.navigate(['home', 'bus', 'detail', bus.id]);
  }

  goToCreate() {
    this.router.navigate(['home', 'bus', 'create']);
  }

  //No se puede borrar si el bus tiene un trip, mostrar bien el mensaje.
  borrarBus(bus: Bus) {
    // bus.model = null;
    this.busService.borrarBus(bus.id).pipe(catchError(err => {
          console.log('Ocurrio un error: ', err);

          this._snackBar.open(err, 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
          });

          return throwError('No se pudo completar la operacion');
        })).subscribe( deleted => this.ngOnInit());
  }


}
