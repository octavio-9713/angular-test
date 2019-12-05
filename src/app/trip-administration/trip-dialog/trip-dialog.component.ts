import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Person} from "../../model/person";
import {TripListComponent} from "../trip-list/trip-list.component";

@Component({
  selector: 'app-trip-dialog',
  templateUrl: './trip-dialog.component.html',
  styleUrls: ['./trip-dialog.component.scss']
})
export class TripDialogComponent implements OnInit {

  constructor( private dialogRef: MatDialogRef<TripListComponent>, @Inject(MAT_DIALOG_DATA) private data: [Person] ) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
