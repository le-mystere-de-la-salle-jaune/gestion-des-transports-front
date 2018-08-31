import { Component, OnInit } from '@angular/core';
import { PublierAnnonceService, Vehicule } from '../publier-annonce.service';
import { SimpleChanges } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ajout-vehicule',
  templateUrl: './ajout-vehicule.component.html',
  styles: []
})
export class AjoutVehiculeComponent implements OnInit {

  nbPlace:string
  marque:string
  model:string
  immatriculation:string
  vehiculeCovoit:Vehicule = new Vehicule()

  @Output() onVehiculeChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onNbPlaceChange(value: string) {
      this.vehiculeCovoit.nbPlace = value
      this.onVehiculeChange.emit(this.vehiculeCovoit);
  }

  onMarqueChange(value: string) {
    this.vehiculeCovoit.marque = value
    this.onVehiculeChange.emit(this.vehiculeCovoit);
}

onModelChange(value: string) {
  this.vehiculeCovoit.model = value
  this.onVehiculeChange.emit(this.vehiculeCovoit);
}

onImmatriculationChange(value: string) {
  this.vehiculeCovoit.immatriculation = value
  this.onVehiculeChange.emit(this.vehiculeCovoit);
}

}
