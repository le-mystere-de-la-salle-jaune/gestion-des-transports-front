import { Component,OnInit } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule, NgSelectOption } from '@angular/forms';
import { Vehicule, Categories } from '../domains';

@Component({
  selector: 'modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent {
  signupFormModalImmatriculation = new FormControl('', Validators.required);
  signupFormModalMarque = new FormControl('', Validators.required);
  signupFormModalModele = new FormControl('', Validators.required);
  signupFormModalPlace = new FormControl('', Validators.required);
  signupFormModalCategorie = new FormControl('', Validators.required);
  signupFormModalPhoto = new FormControl('', Validators.required);

  optionsSelectPlaces:Array<number>=[]
  optionsSelectCategories:Array<string>=[]

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

}