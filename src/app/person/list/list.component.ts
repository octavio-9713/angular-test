import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Person} from '../../model/person';
import {PersonService} from '../service/person.service';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  personsSource: MatTableDataSource<Person>;

  @Input() persons: Person[] = null;

  // Sirve para indicar las columnas a mostrar
  columnsToDisplay = ['nombre', 'edad', 'options'];

  @ViewChild(MatPaginator, {static: true})
  paginator: MatPaginator;

  onlyListing: boolean = false;

  title: string = 'Listado de Personas';


  constructor(private personService: PersonService, private router: Router) {

  }

  ngOnInit() {

    if (this.persons) {
      this.personsSource = new MatTableDataSource<Person>(this.persons);
      this.personsSource.paginator = this.paginator;
      this.onlyListing = true;
      this.columnsToDisplay = ['nombre', 'edad'];
      this.title = 'Listado de Pasajeros';
    } else {
      this.personService.findAll().subscribe(listado => {
        this.personsSource = new MatTableDataSource<Person>(listado);
        this.personsSource.paginator = this.paginator;
      });
    }
  }


  goToDetail(person: Person) {
    this.router.navigate(['home', 'persona', 'detail', person.identificador()]);
  }

  goToCreate() {
    this.router.navigate(['home', 'persona', 'create']);
  }

  borrarPersona(person: Person) {
    this.personService.borrarPersona(person.id).subscribe( deleted => this.ngOnInit());
  }

}
