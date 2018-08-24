import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collab-annonces',
  template: `
    <app-publier-annonce></app-publier-annonce>
  `,
  styles: []
})
export class CollabAnnoncesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
