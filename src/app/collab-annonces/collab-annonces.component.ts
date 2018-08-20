import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collab-annonces',
  template: `
    <p>
      collab-annonces works!
    </p>
  `,
  styles: []
})
export class CollabAnnoncesComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit() {
  }

}
