import { Injectable } from '@angular/core';
import { Vehicule } from '../domains';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

const URL_BACKEND = `http://localhost:8080`;
const API_VH = `api/vehicules`;

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
    return this._http.get(`${URL_BACKEND}/${API_VH}`)
    .toPromise()
    .then((data: any) => data.map(el => new Vehicule(el.id,el.photoUrl, el.immatriculation,el.marque, el.modele, el.categorie)));
  }

  trouverVehiculeParId(id:number)
  {
    return this._http.get(`${URL_BACKEND}/${API_VH}/${id}`)
    .toPromise()
    .then((el: any) => new Vehicule(el.id,el.photoUrl, el.immatriculation,el.marque, el.modele, el.categorie));
  }

  modifierVehicule(ngForm)
  {
    return this._http.put(`${URL_BACKEND}/${API_VH}`,ngForm)
    .toPromise()
    .then((el: any) => new Vehicule(el.id,el.photoUrl, el.immatriculation,el.marque, el.modele, el.categorie));
  }
}
