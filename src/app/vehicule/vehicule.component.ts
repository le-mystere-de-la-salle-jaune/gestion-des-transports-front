import { Component, OnInit, Input } from '@angular/core';
import { Vehicule } from '../domains';

@Component({
  selector: 'app-vehicule',
  templateUrl: './vehicule.component.html',
  styleUrls: ['./vehicule.component.scss']
})
export class VehiculeComponent implements OnInit {

  @Input() vehicule:Vehicule

  constructor() { }

  ngOnInit() {
  }

  modfier(id:number)
  {

  }

  supprimer(id:number)
  {

  }
}
