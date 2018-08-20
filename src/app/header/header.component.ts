import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { empty } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {


  isAuth: boolean;

  constructor() { }

  ngOnInit() {
    let email = sessionStorage.getItem('email');
    if (email !== "undefined") {
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }
  }
}