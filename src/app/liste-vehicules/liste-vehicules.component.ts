import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { VehiculeService } from '../services/vehicule.service';
import { Vehicule, Categories } from '../domains';

@Component({
  selector: 'app-liste-vehicules',
  templateUrl: './liste-vehicules.component.html',
  styleUrls: ['./liste-vehicules.component.scss']
})
export class ListeVehiculesComponent implements OnInit {

  @Input()optionsSelectPlaces:Array<number>=[]
  @Input()optionsSelectCategories:Array<string>=[]

  @Input()listeVehiculesSociete:Vehicule[]=[]

  @Input()saisiImma:string;
  @Input()saisiMarque:string; 

  
  vehicule:Vehicule=new Vehicule(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined)

  @ViewChild('frame')frame:any

  constructor(private _listeVhS:VehiculeService) {
   }

  ngOnInit() {
    
  }

  submit()
  {
    this.vehicule.categorie = this.optionsSelectCategories[this.vehicule.categorie]
    this.vehicule.societe = true
    this._listeVhS.ajouterVehicule(this.vehicule)
    this.frame.hide()
    //location.reload()
  }

  cancel()
  {
    console.log(this.vehicule.categorie = this.optionsSelectCategories[this.vehicule.categorie])
    this.frame.hide()
  }

}
