import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehiculeService } from '../services/vehicule.service';
import { Vehicule, Etat} from '../domains';

@Component({
  selector: 'app-page-details-vehicule',
  templateUrl: './page-details-vehicule.component.html',
  styleUrls: ['./page-details-vehicule.component.scss']
})
export class PageDetailsVehiculeComponent implements OnInit {

  idVehiculeDetail:number
  vehiculeDetail:Vehicule
  newEtatVehicule:Vehicule
  listeEtat:string[]
  numEtat:number
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
    
    this.estEnReparation = false;
    this.estEnService = true;
    this.estHorservice = false;
  }

  vehiculeEstEnService():boolean
  {
    if(this.vehiculeDetail.etat == Etat.EN_SERVICE)
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
    if(this.vehiculeDetail.etat == Etat.HORS_SERVICE)
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
    if(this.vehiculeDetail.etat == Etat.EN_REPARATION)
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
    this.vehiculeDetail.etat = Etat.HORS_SERVICE
    this._Vh.trouverVehiculeParId(this.idVehiculeDetail).then((vehicule:Vehicule) => {
      this.newEtatVehicule=vehicule;
      this.newEtatVehicule.etat= this.vehiculeDetail.etat
    });    
    this._Vh.modifierVehicule(this.newEtatVehicule)
  }

  mettreEnReparation()
  {
    this.vehiculeDetail.etat = Etat.EN_REPARATION
    this._Vh.trouverVehiculeParId(this.idVehiculeDetail).then((vehicule:Vehicule) => {
      this.newEtatVehicule=vehicule;
      this.newEtatVehicule.etat= this.vehiculeDetail.etat
    });    
    this._Vh.modifierVehicule(this.newEtatVehicule)
  }

  mettreEnService()
  {
    this.vehiculeDetail.etat = Etat.EN_SERVICE
    this._Vh.trouverVehiculeParId(this.idVehiculeDetail).then((vehicule:Vehicule) => {
      this.newEtatVehicule=vehicule;
      this.newEtatVehicule.etat= this.vehiculeDetail.etat
    });    
    this._Vh.modifierVehicule(this.newEtatVehicule)
  }

  ngOnInit() {

    this.listeEtat.push(Etat.EN_SERVICE)
    this.listeEtat.push(Etat.HORS_SERVICE)
    this.listeEtat.push(Etat.EN_REPARATION)

  }
}
