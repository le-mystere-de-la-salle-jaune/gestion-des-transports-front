import { Component, OnInit } from '@angular/core';
import { PublierAnnonceService, Vehicule } from '../publier-annonce.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-publier-annonce',
  templateUrl: './publier-annonce.component.html',
  styleUrls: []
})
export class PublierAnnonceComponent implements OnInit {

  vehiculeAnnonce:Vehicule = new Vehicule();

  constructor(private _publierService: PublierAnnonceService) { 

  }

  ngOnInit() {
  }

  publier(){
    console.log(this.vehiculeAnnonce.immatriculation);
    console.log(this.vehiculeAnnonce.marque);
    console.log(this.vehiculeAnnonce.model);
    console.log(this.vehiculeAnnonce.nbPlace);
  }

  public saveVehiculeChange(newVehicule:Vehicule):void{
    this.vehiculeAnnonce = newVehicule
  }

}
