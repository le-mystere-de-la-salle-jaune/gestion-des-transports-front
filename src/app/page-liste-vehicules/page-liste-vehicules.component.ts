import { Component, OnInit, ViewChild, SimpleChanges, OnChanges } from '@angular/core';
import { Vehicule, Categories } from '../domains';
import { VehiculeService } from '../services/vehicule.service';
import {PipeTransform, Pipe} from '@angular/core';

@Component({
  selector: 'app-page-liste-vehicules',
  templateUrl: './page-liste-vehicules.component.html',
  styleUrls: ['./page-liste-vehicules.component.scss']
})
export class PageListeVehiculesComponent implements OnInit, OnChanges {


  saisiImma:string;
  saisiMarque:string; 

  listeVehiculesSociete:Vehicule[]=[]

  optionsSelectPlaces:Array<number>=[]
  optionsSelectCategories:Array<string>=[]

  constructor(private _listeVhS:VehiculeService) 
  { 
    _listeVhS.listerVehiculesSociete().then((vehicules:any) => {
      vehicules.forEach(vehicule => {
        this.listeVehiculesSociete.push(vehicule);
      });
    });
  }

  ngOnInit() {

    for (var _i = 1; _i < 21; _i++)
    {
      this.optionsSelectPlaces.push(_i)
    }

    this.optionsSelectCategories.push(Categories.MICRO_URBAINES)
    this.optionsSelectCategories.push(Categories.MINI_CITADINES)
    this.optionsSelectCategories.push(Categories.CITADINES_POLYVALENTES)
    this.optionsSelectCategories.push(Categories.COMPACTES)
    this.optionsSelectCategories.push(Categories.BERLINES_TAILLE_S)
    this.optionsSelectCategories.push(Categories.BERLINES_TAILL_M)
    this.optionsSelectCategories.push(Categories.BERLINES_TAILL_L)
    this.optionsSelectCategories.push(Categories.SUV_TT_PICKUP)
    
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.listeVehiculesSociete.currentValue)
    {
      this._listeVhS.listerVehiculesSociete().then((vehicules:any) => {
        vehicules.forEach(vehicule => {
          this.listeVehiculesSociete.push(vehicule);
        });
      });
    }
  }

}
