import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  template: `
  <app-header-admin></app-header-admin>
  <router-outlet></router-outlet>`,
  styles: []
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
