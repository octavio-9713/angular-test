import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../security/service/authentication.service";

@Component({
  selector: 'app-main-template',
  templateUrl: './main-template.component.html',
  styleUrls: ['./main-template.component.scss']
})
export class MainTemplateComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  logOut() {
    this.authService.logout();
  }

}
