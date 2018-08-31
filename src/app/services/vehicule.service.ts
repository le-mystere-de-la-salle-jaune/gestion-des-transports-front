import { Injectable } from '@angular/core';
import { Vehicule } from '../domains';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { environment } from '../../environments/environment';




@Injectable({
  providedIn: 'root'
})

export class VehiculeService 
{

  constructor(private _http:HttpClient) 
  { 

  }

  listerVehicules():Promise<Vehicule[]>  
  {
    return this._http.get(`${environment.baseUrl}${environment.apiVehicule}`)
    .toPromise()
    .then((data: any) => data.map(el => new Vehicule(el.id,el.photoUrl, el.immatriculation,el.marque, el.modele, el.categorie, el.places, el.societe,el.etat)));
  }

  listerVehiculesSociete():Promise<Vehicule[]>
  {
    return this._http.get(`${environment.baseUrl}${environment.apiVehiculeSociete}`)
    .toPromise()
    .then((data: any) => data.map(el => new Vehicule(el.id,el.photoUrl, el.immatriculation,el.marque, el.modele, el.categorie, el.places, el.societe,el.etat)));
  }

  trouverVehiculeParId(id:number):Promise<Vehicule>
  {
    return this._http.get(`${environment.baseUrl}${environment.apiVehicule}/${id}`)
    .toPromise()
    .then((el: any) => new Vehicule(el.id,el.photoUrl, el.immatriculation,el.marque, el.modele, el.categorie, el.places, el.societe,el.etat));
  }

  modifierVehicule(ngForm)
  {
    return this._http.put(`${environment.baseUrl}${environment.apiVehicule}`,ngForm)
    .toPromise()
    .then((el: any) => new Vehicule(el.id,el.photoUrl, el.immatriculation,el.marque, el.modele, el.categorie, el.places, el.societe,el.etat));
  }

  ajouterVehicule(ngForm)
  {
    return this._http.post(`${environment.baseUrl}${environment.apiVehicule}`,ngForm)
    .toPromise()
    .then((el: any) => new Vehicule(el.id,el.photoUrl, el.immatriculation,el.marque, el.modele, el.categorie, el.places, el.societe,el.etat));
  }

  supprimerVehicule(id:number)
  {
    return this._http.delete(`${environment.baseUrl}${environment.apiVehicule}/${id}`)
    .toPromise()
    .then((el: any) => new Vehicule(el.id,el.photoUrl, el.immatriculation,el.marque, el.modele, el.categorie, el.places, el.societe,el.etat));
  }
}
