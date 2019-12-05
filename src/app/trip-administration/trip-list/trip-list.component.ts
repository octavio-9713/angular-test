import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Bus} from '../../model/bus';
import {MatPaginator} from '@angular/material/paginator';
import {BusService} from '../../services/bus.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {TripService} from '../../services/trip.service';
import {Trip} from '../../model/trip';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {ListComponent} from "../../person/list/list.component";
import {TripDialogComponent} from "../trip-dialog/trip-dialog.component";

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent implements OnInit {

  trips: MatTableDataSource<Trip>;

  columnsToDisplay = ['departure', 'destination', 'bus', 'start', 'end', 'options'];

  @ViewChild(MatPaginator, {static: true})
  paginator: MatPaginator;


  constructor(private tripService: TripService, private router: Router, private dialog: MatDialog) {

  }

  ngOnInit() {
    this.tripService.findAll().subscribe(listado => {
      this.trips = new MatTableDataSource<Trip>(listado);
      this.trips.paginator = this.paginator;
    });
  }

  goToDetail(trip: Trip) {
    this.router.navigate(['home', 'trip', 'detail', trip.id]);
  }

  goToCreate() {
    this.router.navigate(['home', 'trip', 'create']);
  }

  showList(trip: Trip) {
    const dialogRef = this.dialog.open(TripDialogComponent, {
      data: trip.passengers,
    });
  }

}
