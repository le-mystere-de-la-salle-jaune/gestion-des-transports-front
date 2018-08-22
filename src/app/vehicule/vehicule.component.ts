import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Vehicule, Categories } from '../domains';
import { VehiculeService } from '../services/vehicule.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicule',
  templateUrl: './vehicule.component.html',
  styleUrls: ['./vehicule.component.scss']
})
export class VehiculeComponent implements OnInit {

  @Input() vehicule:Vehicule
  newVehicule:Vehicule=new Vehicule(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined)


  optionsSelectPlaces:Array<number>=[]
  optionsSelectCategories:Array<string>=[]

  numCategorie:number
  

  @ViewChild('frame')frame:any

  constructor(private _vh:VehiculeService,private router: Router) { }

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
    this.vehicule = this.newVehicule
    this.numCategorie = parseInt(this.vehicule.categorie)
    this.vehicule.categorie = this.optionsSelectCategories[this.numCategorie]
    this._vh.modifierVehicule(this.vehicule)
    this.frame.hide()
    this.newVehicule = new Vehicule(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined)
  }

  modifier()
  {
    this.newVehicule.id = this.vehicule.id
    this.newVehicule.immatriculation = this.vehicule.immatriculation
    this.newVehicule.marque = this.vehicule.marque
    this.newVehicule.modele = this.vehicule.modele
    this.numCategorie = this.optionsSelectCategories.indexOf(this.vehicule.categorie)
    this.newVehicule.categorie = this.numCategorie.toString()
    this.newVehicule.places = this.vehicule.places
    this.newVehicule.photoUrl = this.vehicule.photoUrl
    this.frame.show()
  }

  cancel()
  {
    this.frame.hide()
  }

  supprimer()
  {
    this._vh.supprimerVehicule(this.vehicule.id);
    location.reload()
  }
}
