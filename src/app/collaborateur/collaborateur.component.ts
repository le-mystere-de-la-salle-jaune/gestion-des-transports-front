import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collaborateur',
  template: `
  <app-header></app-header>
  <router-outlet></router-outlet>`,
  styles: []
})
export class CollaborateurComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
