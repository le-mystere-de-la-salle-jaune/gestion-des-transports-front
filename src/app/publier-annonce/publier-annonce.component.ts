import { Component, OnInit, ViewChild } from '@angular/core';
import { PublierAnnonceService, Vehicule, Adresse, DateHeure, Annonce } from '../publier-annonce.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-publier-annonce',
  templateUrl: './publier-annonce.component.html',
  styleUrls: []
})
export class PublierAnnonceComponent implements OnInit {

  vehiculeAnnonce:Vehicule = new Vehicule()
  adresseAnnonce:Adresse = new Adresse()
  horraireAnnonce:DateHeure = new DateHeure()
  finalAnnonce: Annonce = new Annonce()

  @ViewChild('frame')frame:any

  constructor(private _publierAnnonceService:PublierAnnonceService) { 
  }

  ngOnInit() {
  }

  publier(){
    console.log(this.vehiculeAnnonce.immatriculation);
    console.log(this.vehiculeAnnonce.marque);
    console.log(this.vehiculeAnnonce.model);
    console.log(this.vehiculeAnnonce.nbPlace);

    console.log(this.adresseAnnonce.adresseDep)
    console.log(this.adresseAnnonce.adresseArr)

    console.log(this.horraireAnnonce.dateDepart)
    console.log(this.horraireAnnonce.heureDepart)
    console.log(this.horraireAnnonce.minuteDepart)

    this.finalAnnonce.itineraireAnnonce = this.adresseAnnonce
    this.finalAnnonce.vehiculeAnnonce = this.vehiculeAnnonce
    this.finalAnnonce.horraireAnnonce = this.horraireAnnonce
    this.finalAnnonce.userEmail = sessionStorage.getItem("email")

    this.frame.hide()

    this._publierAnnonceService.postAnnonce(this.finalAnnonce)

    location.reload()

  }

  saveVehiculeChange(newVehicule:Vehicule):void{
    this.vehiculeAnnonce = newVehicule
  }

  saveAdresseChange(newAdresse:Adresse):void{
    this.adresseAnnonce = newAdresse
  }

  saveHorraireChange(newHorraire:DateHeure):void{
    this.horraireAnnonce = newHorraire
  }

}
