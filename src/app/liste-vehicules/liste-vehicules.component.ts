import { Component, OnInit, ViewChild } from '@angular/core';
import { Vehicule, Categories } from '../domains';
import { VehiculeService } from '../services/vehicule.service';
import {PipeTransform, Pipe} from '@angular/core';

@Component({
  selector: 'app-liste-vehicules',
  templateUrl: './liste-vehicules.component.html',
  styleUrls: ['./liste-vehicules.component.scss']
})
export class ListeVehiculesComponent implements OnInit {

  listeVehiculesSociete:Vehicule[]=[]
  saisiImma:string;
  saisiMarque:string;

  optionsSelectPlaces:Array<number>=[]
  optionsSelectCategories:Array<string>=[]

  vehicule:Vehicule=new Vehicule(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined)

  @ViewChild('frame')frame:any
  


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

  submit()
  {
    this.vehicule.categorie = this.optionsSelectCategories[this.vehicule.categorie]
    this.vehicule.societe = true
    this._listeVhS.ajouterVehicule(this.vehicule)
    this.frame.hide()
    location.reload()
  }

  cancel()
  {
    console.log(this.vehicule.categorie = this.optionsSelectCategories[this.vehicule.categorie])
    this.frame.hide()
  }

}
