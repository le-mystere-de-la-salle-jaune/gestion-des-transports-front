import { Component, OnInit } from '@angular/core';
import { Vehicule } from '../domains';
import { VehiculeService } from '../services/vehicule.service';
import {PipeTransform, Pipe} from '@angular/core';

@Component({
  selector: 'app-liste-vehicules',
  templateUrl: './liste-vehicules.component.html',
  styleUrls: ['./liste-vehicules.component.scss']
})
export class ListeVehiculesComponent implements OnInit {

  listeVehicules:Vehicule[]=[]
  saisiImma:string;
  saisiMarque:string;

  constructor(private _listeVh:VehiculeService) 
  { 
    _listeVh.listerVehicules().then((vehicules:any) => {
      vehicules.forEach(vehicule => {
        this.listeVehicules.push(vehicule);
      });
    });
  }

  ngOnInit() {
  }

  ajouter()
  {

  }

}
