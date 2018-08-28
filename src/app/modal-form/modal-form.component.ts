import { Component,OnInit, ViewChild, Output } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule, NgSelectOption } from '@angular/forms';
import { Vehicule, Categories } from '../domains';
import { VehiculeService } from '../services/vehicule.service';
import { Router } from '@angular/router';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent {

  optionsSelectPlaces:Array<number>=[]
  optionsSelectCategories:Array<string>=[]

  vehicule:Vehicule=new Vehicule(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined)

  @ViewChild('frame')frame:any
  

  constructor(private _vh:VehiculeService,private router: Router)
  {
    
  }

  ngOnInit()
  {
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
    this._vh.ajouterVehicule(this.vehicule)
    this.frame.hide()
    //location.reload()
  }

  cancel()
  {
    this.frame.hide()
  }

}