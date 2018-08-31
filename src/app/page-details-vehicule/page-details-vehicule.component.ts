import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehiculeService } from '../services/vehicule.service';
import { Vehicule } from '../domains';

@Component({
  selector: 'app-page-details-vehicule',
  templateUrl: './page-details-vehicule.component.html',
  styleUrls: ['./page-details-vehicule.component.scss']
})
export class PageDetailsVehiculeComponent implements OnInit {

  idVehiculeDetail:number
  vehiculeDetail:Vehicule
  newEtatVehicule:Vehicule

  etat:string

  @ViewChild("estEnReparation")
  estEnReparation:boolean
  @ViewChild("estEnService")
  estEnService:boolean
  @ViewChild("estHorsService")
  estHorservice:boolean


  

  constructor(private _Vh:VehiculeService,private route: ActivatedRoute) { 
    this.idVehiculeDetail = parseInt(route.snapshot.paramMap.get("id"));
    _Vh.trouverVehiculeParId(this.idVehiculeDetail).then((vehicule:Vehicule) => {
      this.vehiculeDetail=vehicule;
    });
    
  }

  verificationEtatInit()
  {
    this.vehiculeEstEnReparation();
    this.vehiculeEstHorsService();
    this.vehiculeEstEnService();
  }

  vehiculeEstEnService():boolean
  {
    if(this.vehiculeDetail.etat == "En service")
    {
      this.estEnReparation = false
      this.estEnService = true
      this.estHorservice = false

      return false
    }
    

    return true
  } 

  vehiculeEstHorsService():boolean
  {
    if(this.vehiculeDetail.etat == "Hors service")
    {
      this.estEnReparation = false
      this.estEnService = false
      this.estHorservice = true

      return false
    }
    

    return true
  } 

  vehiculeEstEnReparation():boolean
  {
    if(this.vehiculeDetail.etat == "En réparation")
    {
      this.estEnReparation = true
      this.estEnService = false
      this.estHorservice = false

      return false
    }
  
    return true
  }

  mettreHorsService()
  {
    this.etat = "Hors service"
    this.newEtatVehicule = this.vehiculeDetail
    this.newEtatVehicule.etat = this.etat
    this._Vh.modifierVehicule(this.newEtatVehicule)
  }

  mettreEnReparation()
  {
    this.etat = "En réparation"
    this.newEtatVehicule = this.vehiculeDetail
    this.newEtatVehicule.etat = this.etat
    this._Vh.modifierVehicule(this.newEtatVehicule)
  }

  mettreEnService()
  {
    this.etat = "En service"
    this.newEtatVehicule = this.vehiculeDetail
    this.newEtatVehicule.etat = this.etat
    this._Vh.modifierVehicule(this.newEtatVehicule)
  }

  ngOnInit() {
    console.log(this.vehiculeDetail.etat)
    this.etat = this.vehiculeDetail.etat;
    console.log(this.etat)
  }
}
